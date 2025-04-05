import json
import requests

from fastapi import Depends
from fastapi import security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from jwt.algorithms import RSAAlgorithm
from app.core.config import settings

security = HTTPBearer()


def get_jwks() -> dict:
    """
    Fetch the JSON Web Key Set (JWKS) from the Clerk API.
    """
    response = requests.get(settings.CLERK_JWKS_URL)
    response.raise_for_status()
    return response.json()


def get_public_key(kid) -> str:
    """
    Retrieve the public key from the JWKS.
    """
    jwks = get_jwks()
    for key in jwks["keys"]:
        if key["kid"] == kid:
            return RSAAlgorithm.from_jwk(json.dumps(key))
    raise Exception("Public key not found")


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    Decode the JWT token using the public key.
    """
    token = credentials.credentials

    try:
        header = jwt.get_unverified_header(token)
        kid = header["kid"]
        public_key = get_public_key(kid)

        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience="money-tracker-api",
            issuer=settings.CLERK_ISSUER,
        )

        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")
    except Exception as e:
        raise Exception(f"Error decoding token: {str(e)}")
