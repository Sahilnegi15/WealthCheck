from fastapi import APIRouter
from fastapi import Depends

import yfinance as yf

from app.db import get_connection

from app.utils.deps import (
    get_current_user
)

from app.schemas.portfolio import (
    PortfolioCreate
)


router = APIRouter()

@router.post("/")
def add_stock(
    stock: PortfolioCreate,
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO portfolio(
            user_id,
            symbol,
            quantity,
            buy_price
        )
        VALUES(?,?,?,?)
    """, (
        user_id,
        stock.symbol.upper(),
        stock.quantity,
        stock.buy_price
    ))

    conn.commit()
    conn.close()

    return {
        "message": "stock added"
    }

@router.get("/")
def get_portfolio(
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM portfolio
        WHERE user_id = ?
    """, (
        user_id,
    ))

    rows = cursor.fetchall()

    conn.close()

    result = []

    for row in rows:

        ticker = yf.Ticker(
            row["symbol"]
        )

        price = ticker.info.get(
            "currentPrice",
            0
        )

        invested = (
            row["quantity"]
            *
            row["buy_price"]
        )

        current_value = (
            row["quantity"]
            *
            price
        )

        pnl = (
            current_value
            -
            invested
        )

        result.append({
            "id": row["id"],
            "symbol": row["symbol"],
            "quantity": row["quantity"],
            "buy_price": row["buy_price"],

            "current_price": price,

            "invested": round(
                invested,
                2
            ),

            "current_value": round(
                current_value,
                2
            ),

            "pnl": round(
                pnl,
                2
            )
        })

    return result

@router.delete("/{holding_id}")
def delete_holding(
    holding_id: int,
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM portfolio
        WHERE id = ?
        AND user_id = ?
    """, (
        holding_id,
        user_id
    ))

    conn.commit()
    conn.close()

    return {
        "message": "holding deleted"
    }