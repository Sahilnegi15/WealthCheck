from pydantic import BaseModel, Field


class UserCreate(BaseModel):

    name: str

    email: str

    password: str = Field(
        min_length=6,
        max_length=72
    )