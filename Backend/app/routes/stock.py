from fastapi import APIRouter
import yfinance as yf


router = APIRouter()


@router.get("/{symbol}")
def get_stock(symbol: str):

    ticker = yf.Ticker(symbol)

    info = ticker.info

    return {
        "symbol": symbol.upper(),
        "name": info.get("longName"),
        "price": info.get("currentPrice"),
        "currency": info.get("currency"),
        "market_cap": info.get("marketCap")
    }