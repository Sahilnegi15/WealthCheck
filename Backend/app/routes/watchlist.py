from fastapi import (
    APIRouter,
    Depends
)

import yfinance as yf

from app.db import (
    get_connection
)

from app.utils.deps import (
    get_current_user
)


router = APIRouter()

@router.post("/{symbol}")
def add_watchlist(
    symbol: str,

    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO watchlist(
            user_id,
            symbol
        )
        VALUES(?,?)
    """, (
        user_id,
        symbol.upper()
    ))

    conn.commit()
    conn.close()

    return {
        "message":
        "added"
    }

@router.get("/")
def get_watchlist(
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM watchlist
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

        info = ticker.info

        result.append({

            "id":
            row["id"],

            "symbol":
            row["symbol"],

            "price":
            info.get(
                "currentPrice"
            ),

            "name":
            info.get(
                "longName"
            )
        })

    return result

@router.delete("/{watch_id}")
def delete_watchlist(
    watch_id: int,
    user_id: int = Depends(
        get_current_user
    )
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM watchlist
        WHERE id = ?
        AND user_id = ?
    """, (
        watch_id,
        user_id
    ))

    conn.commit()
    conn.close()

    return {
        "message":
        "removed"
    }