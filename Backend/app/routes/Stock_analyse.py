from fastapi import APIRouter
import yfinance as yf


router = APIRouter(

    prefix="/stocks",

    tags=["stocks"]
)


@router.get(
    "/analysis/{symbol}"
)
async def analyze_stock(
    symbol: str
):

    stock = yf.Ticker(
        symbol
    )


    info = stock.info


    current_price = info.get(
        "currentPrice",
        0
    )


    pe_ratio = info.get(
        "trailingPE",
        0
    )


    week_high = info.get(
        "fiftyTwoWeekHigh",
        0
    )


    week_low = info.get(
        "fiftyTwoWeekLow",
        0
    )


    dividend = info.get(
        "dividendYield",
        0
    )



    recommendation = "HOLD"


    if pe_ratio:

        if pe_ratio < 20:

            recommendation = "BUY"


        elif pe_ratio > 35:

            recommendation = "SELL"



    trend = "BEARISH"


    midpoint = (
        week_high +
        week_low
    ) / 2


    if current_price > midpoint:

        trend = "BULLISH"



    return {

        "symbol":
        symbol.upper(),


        "current_price":
        current_price,


        "pe_ratio":
        pe_ratio,


        "week_high":
        week_high,


        "week_low":
        week_low,


        "dividend_yield":
        dividend,


        "trend":
        trend,


        "recommendation":
        recommendation
    }