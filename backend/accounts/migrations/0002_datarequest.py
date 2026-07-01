"""Perturbation J3-bis (CA-J3B-6) — modèle DataRequest pour l'audit trail SAR."""

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="DataRequest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                (
                    "requester_email_snapshot",
                    models.EmailField(
                        max_length=254,
                        help_text=(
                            "Copie de l'email à la date de la demande "
                            "(survit à la suppression du compte)"
                        ),
                    ),
                ),
                (
                    "request_type",
                    models.CharField(
                        choices=[
                            ("access", "Accès (Art. 15)"),
                            ("erasure", "Effacement (Art. 17)"),
                            ("portability", "Portabilité (Art. 20)"),
                        ],
                        default="access",
                        max_length=16,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("received", "Reçue"),
                            ("in_progress", "En cours de traitement"),
                            ("answered", "Répondue"),
                        ],
                        default="received",
                        max_length=16,
                    ),
                ),
                ("ip_address", models.GenericIPAddressField(null=True, blank=True)),
                (
                    "format_requested",
                    models.CharField(
                        default="json",
                        help_text="Format retourné (json, csv, zip)",
                        max_length=8,
                    ),
                ),
                (
                    "file_hash",
                    models.CharField(
                        blank=True,
                        help_text="SHA-256 du fichier retourné, pour prouver l'intégrité",
                        max_length=64,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("responded_at", models.DateTimeField(null=True, blank=True)),
                (
                    "requester",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="data_requests",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["requester", "created_at"],
                        name="accounts_da_request_a8fbde_idx",
                    ),
                    models.Index(
                        fields=["status"], name="accounts_da_status_c2e3f7_idx"
                    ),
                ],
            },
        ),
    ]
