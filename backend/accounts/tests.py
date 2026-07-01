"""Tests pédagogiques pour l'app accounts.

Ces tests servent d'exemples : signup, login, logout, accès protégé.
Lancez : pytest accounts/
"""

import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db


@pytest.fixture
def client() -> APIClient:
    return APIClient()


@pytest.fixture
def user(db) -> User:
    return User.objects.create_user(
        username="alice", email="alice@test.com", password="motdepasse123"
    )


def test_signup_creates_user(client):
    # Lot 3 : inscription par EMAIL (username = email en interne).
    response = client.post(
        "/api/accounts/signup/",
        {
            "email": "bob@test.com",
            "password": "motdepasse123",
        },
        format="json",
    )
    assert response.status_code == 201, response.data
    assert User.objects.filter(email="bob@test.com").exists()


def test_signup_requires_email(client):
    response = client.post(
        "/api/accounts/signup/",
        {"password": "motdepasse123"},
        format="json",
    )
    assert response.status_code == 400


def test_login_returns_token(client, user):
    response = client.post(
        "/api/accounts/login/",
        {"email": "alice@test.com", "password": "motdepasse123"},
        format="json",
    )
    assert response.status_code == 200, response.data
    assert "token" in response.data
    assert response.data["user"]["email"] == "alice@test.com"


def test_login_with_wrong_password(client, user):
    response = client.post(
        "/api/accounts/login/",
        {"email": "alice@test.com", "password": "wrong"},
        format="json",
    )
    assert response.status_code == 400


def test_me_requires_auth(client):
    response = client.get("/api/accounts/me/")
    assert response.status_code in (401, 403)


def test_me_with_token(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/")
    assert response.status_code == 200
    assert response.data["username"] == "alice"


def test_logout_invalidates_token(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.post("/api/accounts/logout/")
    assert response.status_code == 204
    # Le token n'existe plus
    assert not Token.objects.filter(key=token.key).exists()


# ---------------------------------------------------------------------------
# J3-bis — Tests RGPD Art. 15 (export SAR)
# ---------------------------------------------------------------------------


def test_gdpr_export_requires_auth(client):
    response = client.get("/api/accounts/me/export/")
    assert response.status_code in (401, 403)


def test_gdpr_export_returns_user_data(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/export/")
    assert response.status_code == 200

    data = response.data
    assert data["user"]["email"] == "alice@test.com"
    assert "export_date" in data
    assert "base_legale" in data
    assert isinstance(data["quizzes"], list)


def test_gdpr_export_includes_quizzes(client, user):
    """Vérifie que les quiz de l'utilisateur apparaissent dans l'export."""
    from rest_framework.authtoken.models import Token

    from quizzes.models import Question, Quiz

    quiz = Quiz.objects.create(user=user, title="Cours test", source_text="source")
    Question.objects.create(
        quiz=quiz, index=1, prompt="Q?", options=["A", "B", "C", "D"], correct_index=0
    )

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/export/")
    assert response.status_code == 200

    quizzes = response.data["quizzes"]
    assert len(quizzes) == 1
    assert quizzes[0]["title"] == "Cours test"
    assert len(quizzes[0]["questions"]) == 1


def test_gdpr_export_content_disposition(client, user):
    """L'en-tête Content-Disposition doit inciter le navigateur à télécharger le fichier."""
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/export/")
    assert "attachment" in response.get("Content-Disposition", "")
