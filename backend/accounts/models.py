"""
Modèles de l'app accounts.

[Note pédagogique] On garde le modèle User standard de Django (simple et
robuste), et on lui ajoute un Profil 1-pour-1 pour les infos métier qui ne sont
pas dans User — ici `email_verified` (l'utilisateur a-t-il cliqué le lien de
confirmation envoyé par email ?).

Choix d'architecture « email = identifiant » : à l'inscription, on met
username = email (voir SignupSerializer). Le login se fait donc par email, sans
backend d'authentification custom. C'est le compromis le plus simple pour un
kit pédagogique (un vrai produit utiliserait souvent un User personnalisé avec
USERNAME_FIELD = 'email').
"""

from django.conf import settings
from django.db import models


class Profile(models.Model):
    """Informations complémentaires attachées à un utilisateur."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    # Validation "soft" : le compte fonctionne même si l'email n'est pas vérifié,
    # mais un bandeau invite l'utilisateur à cliquer le lien de confirmation.
    email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Profile<{self.user.email or self.user.username}>"


def get_or_create_profile(user) -> Profile:
    """Récupère (ou crée) le profil d'un utilisateur.

    Pratique pour les comptes créés AVANT l'ajout du modèle Profile (ils n'ont
    pas encore de profil) : on le crée à la volée plutôt que de planter.
    """
    profile, _ = Profile.objects.get_or_create(user=user)
    return profile


class DataRequest(models.Model):
    """Audit trail persistant des demandes RGPD (Subject Access Requests).

    Perturbation J3-bis (CA-J3B-6) : la CNIL exige une preuve de traitement
    des demandes d'accès. Les logs applicatifs sont volatils et disparaissent
    au redémarrage du pod ; on persiste donc chaque appel en base.
    """

    STATUS_RECEIVED = "received"
    STATUS_IN_PROGRESS = "in_progress"
    STATUS_ANSWERED = "answered"
    STATUS_CHOICES = [
        (STATUS_RECEIVED, "Reçue"),
        (STATUS_IN_PROGRESS, "En cours de traitement"),
        (STATUS_ANSWERED, "Répondue"),
    ]

    TYPE_ACCESS = "access"       # Art. 15 — export self-service
    TYPE_ERASURE = "erasure"     # Art. 17 — suppression compte
    TYPE_PORTABILITY = "portability"  # Art. 20 — export machine-readable
    TYPE_CHOICES = [
        (TYPE_ACCESS, "Accès (Art. 15)"),
        (TYPE_ERASURE, "Effacement (Art. 17)"),
        (TYPE_PORTABILITY, "Portabilité (Art. 20)"),
    ]

    requester = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,  # on garde la trace même si le compte est supprimé
        null=True,
        related_name="data_requests",
    )
    requester_email_snapshot = models.EmailField(
        help_text="Copie de l'email à la date de la demande (survit à la suppression du compte)",
    )
    request_type = models.CharField(max_length=16, choices=TYPE_CHOICES, default=TYPE_ACCESS)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=STATUS_RECEIVED)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    format_requested = models.CharField(
        max_length=8,
        default="json",
        help_text="Format retourné (json, csv, zip)",
    )
    file_hash = models.CharField(
        max_length=64,
        blank=True,
        help_text="SHA-256 du fichier retourné, pour prouver l'intégrité",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["requester", "created_at"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self) -> str:
        return f"DataRequest<{self.request_type} · {self.requester_email_snapshot} · {self.created_at:%Y-%m-%d}>"
