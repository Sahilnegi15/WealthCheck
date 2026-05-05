from fastapi import FastAPI

from app.db import init_db
from app.routes.user import router as user_router
from app.routes.expense import (
    router as expense_router
)
from app.routes.analytics import (
    router as analytics_router
)
from app.routes import stock
from app.routes.portfolio import (
    router as portfolio_router
)
from app.routes.watchlist import (
    router as watchlist_router
)

from app.routes.Stock_analyse import (
    router as Stock_analyse_router
)

from fastapi.middleware.cors import (
    CORSMiddleware
)


app = FastAPI(
    title="FinSight API"
)
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def home():
    return {
        "message": "FinSight API running"
    }

app.include_router(
    user_router,
    prefix="/api/users",
    tags=["Users"]
)

app.include_router(
    expense_router,
    prefix="/api/expenses",
    tags=["Expenses"]
)

app.include_router(
    analytics_router,
    prefix="/api/analytics",
    tags=["Analytics"]
)

app.include_router(
    portfolio_router,
    prefix="/api/portfolio",
    tags=["Portfolio"]
)


app.include_router(
    stock.router,
    prefix="/api"
)


app.include_router(

    Stock_analyse_router,

    prefix="/api"
)