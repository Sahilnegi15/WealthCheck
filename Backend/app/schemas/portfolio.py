from pydantic import BaseModel


class PortfolioCreate(BaseModel):
    symbol: str
    quantity: float
    buy_price: float