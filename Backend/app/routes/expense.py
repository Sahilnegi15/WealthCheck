from fastapi import APIRouter
from fastapi import Depends

from app.schemas.expense import ExpenseCreate

from app.db import get_connection

from app.utils.deps import (
    get_current_user
)


router = APIRouter()

@router.post("/")
def create_expense(
    expense: ExpenseCreate,
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO expenses(
            user_id,
            amount,
            category,
            note
        )
        VALUES(?,?,?,?)
    """, (
        user_id,
        expense.amount,
        expense.category,
        expense.note
    ))

    conn.commit()
    conn.close()

    return {
        "message": "expense created"
    }

@router.get("/")
def get_expenses(
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM expenses
        WHERE user_id = ?
        ORDER BY created_at DESC
    """, (
        user_id,
    ))

    expenses = cursor.fetchall()

    conn.close()

    return [
        dict(expense)
        for expense in expenses
    ]

@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM expenses
        WHERE id = ?
        AND user_id = ?
    """, (
        expense_id,
        user_id
    ))

    conn.commit()
    conn.close()

    return {
        "message": "expense deleted"
    }