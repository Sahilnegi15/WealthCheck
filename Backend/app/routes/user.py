from fastapi import APIRouter,HTTPException
from app.schemas.user import UserCreate
from app.db import get_connection
from app.utils.auth import hash_password
from app.schemas.login import LoginRequest
from app.utils.auth import (
    verify_password,
    create_access_token
)

router = APIRouter()



@router.post("/register")
def register(user: UserCreate):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        hashed_password = (
            hash_password(
                user.password
            )
        )

        cursor.execute("""
            INSERT INTO users(
                name,
                email,
                password
            )
            VALUES(?,?,?)
        """, (
            user.name,
            user.email,
            hashed_password
        ))

        conn.commit()

        return {
            "message":
            "user created"
        }

    except Exception as e:

        print(
            "REGISTER ERROR:",
            str(e)
        )

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    finally:

        conn.close()


@router.post("/login")
def login(data: LoginRequest):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM users
        WHERE email = ?
    """, (
        data.email,
    ))

    user = cursor.fetchone()

    conn.close()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        data.password,
        user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "user_id": user["id"]
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }