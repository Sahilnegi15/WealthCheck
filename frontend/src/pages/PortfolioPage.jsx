import {
  useEffect,
  useState
} from "react";

import api
from "../api/client";


export default function
PortfolioPage() {

  const [
    holdings,
    setHoldings
  ] = useState([]);


  const [
    symbol,
    setSymbol
  ] = useState("");


  const [
    quantity,
    setQuantity
  ] = useState("");


  const [
    buyPrice,
    setBuyPrice
  ] = useState("");


  useEffect(() => {

    loadPortfolio();

  }, []);


  async function
  loadPortfolio() {

    const res =
      await api.get(
        "/portfolio"
      );

    setHoldings(
      res.data
    );
  }


  async function
  addHolding(e) {

    e.preventDefault();


    await api.post(

      "/portfolio",

      {

        symbol,

        quantity:
          Number(quantity),

        buy_price:
          Number(buyPrice)
      }
    );


    setSymbol("");
    setQuantity("");
    setBuyPrice("");


    loadPortfolio();
  }


  async function
  deleteHolding(id) {

    await api.delete(

      `/portfolio/${id}`
    );


    loadPortfolio();
  }


  return (

    <div>

      <h1
        className="
        text-2xl
        mb-8
        font-bold
      "
      >
        Portfolio
      </h1>


      <form

        onSubmit={
          addHolding
        }

        className="
        border
        p-4
        rounded
        mb-8
      "
      >

        <div
          className="
          grid
          grid-cols-4
          gap-4
        "
        >

          <input
            placeholder="AAPL"

            value={symbol}

            onChange={
              e =>
              setSymbol(
                e.target.value
              )
            }

            className="
            border
            p-2
          "
          />


          <input
            placeholder=
              "Quantity"

            value={
              quantity
            }

            onChange={
              e =>
              setQuantity(
                e.target.value
              )
            }

            className="
            border
            p-2
          "
          />


          <input
            placeholder=
              "Buy Price"

            value={
              buyPrice
            }

            onChange={
              e =>
              setBuyPrice(
                e.target.value
              )
            }

            className="
            border
            p-2
          "
          />


          <button

            className="
            border
            p-2
          "
          >

            Add

          </button>

        </div>

      </form>


      <div
        className="
        flex
        flex-col
        gap-4
      "
      >

        {

          holdings.map(

            stock => (

              <HoldingCard

                key={
                  stock.id
                }

                stock={
                  stock
                }

                onDelete={
                  deleteHolding
                }

              />
            )
          )
        }

      </div>

    </div>
  );
}
function HoldingCard(
  {
    stock,
    onDelete
  }
) {

  return (

    <div
      className="
      border
      p-4
      rounded

      flex
      justify-between
    "
    >

      <div>

        <h2
          className="
          text-xl
          font-bold
        "
        >
          {stock.symbol}
        </h2>


        <p>
          Qty:
          {" "}
          {stock.quantity}
        </p>


        <p>
          Buy:
          {" "}
          {stock.buy_price}
        </p>


        <p>
          Live:
          {" "}
          {
            stock.current_price
          }
        </p>

      </div>


      <div
        className="
        text-right
      "
      >

        <p>
          Invested:
          {" "}
          {
            stock.invested
          }
        </p>


        <p>
          Current:
          {" "}
          {
            stock.current_value
          }
        </p>


        <p>
          P/L:
          {" "}
          {
            stock.pnl
          }
        </p>


        <button

          onClick={() =>
            onDelete(
              stock.id
            )
          }

        >

          Delete

        </button>

      </div>

    </div>
  );
}