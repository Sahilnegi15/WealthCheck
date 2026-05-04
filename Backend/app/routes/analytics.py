from fastapi import APIRouter, Depends

from app.db import get_connection
from app.utils.deps import get_current_user


router = APIRouter()

@router.get("/monthly")
def monthly_spending(
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            strftime('%Y-%m', created_at) as month,
            ROUND(SUM(amount),2) as total
        FROM expenses
        WHERE user_id = ?
        GROUP BY month
        ORDER BY month DESC
    """, (
        user_id,
    ))

    rows = cursor.fetchall()

    conn.close()

    return [
        dict(row)
        for row in rows
    ]

@router.get("/categories")
def category_breakdown(
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            category,
            ROUND(SUM(amount),2) as total
        FROM expenses
        WHERE user_id = ?
        GROUP BY category
        ORDER BY total DESC
    """, (
        user_id,
    ))

    rows = cursor.fetchall()

    conn.close()

    return [
        dict(row)
        for row in rows
    ]

@router.get("/summary")
def current_month_summary(
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            COUNT(*) as total_transactions,
            ROUND(SUM(amount),2) as total_spent,
            ROUND(AVG(amount),2) as average_spent
        FROM expenses
        WHERE user_id = ?
        AND strftime('%Y-%m', created_at)
            =
            strftime('%Y-%m','now')
    """, (
        user_id,
    ))

    row = cursor.fetchone()

    conn.close()

    return dict(row)