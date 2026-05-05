from fastapi import APIRouter
import yfinance as yf

router = APIRouter(
    prefix="/stocks",
    tags=["Stocks"]
)


@router.get("/{symbol}")
async def get_stock(symbol: str):

    stock = yf.Ticker(symbol)

    info = stock.info


    return {
        "symbol": symbol.upper(),

        "name": info.get(
            "shortName"
        ),

        "price": info.get(
            "currentPrice"
        ),

        "day_high": info.get(
            "dayHigh"
        ),

        "day_low": info.get(
            "dayLow"
        ),

        "market_cap": info.get(
            "marketCap"
        ),

        "currency": info.get(
            "currency"
        )
    }