import {
  useState
} from "react";

import api from "../api/client";


export default function
MarketPage() {

  const [
    symbol,
    setSymbol
  ] = useState("AAPL");


  const [
    stock,
    setStock
  ] = useState(null);


  const [
    analysis,
    setAnalysis
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(false);



  async function
  searchStock(e) {

    e.preventDefault();

    try {

      setLoading(
        true
      );


      const [

        stockRes,

        analysisRes

      ] = await Promise.all([

        api.get(

          `/stocks/${symbol}`
        ),

        api.get(

          `/stocks/analysis/${symbol}`
        )

      ]);


      setStock(
        stockRes.data
      );


      setAnalysis(
        analysisRes.data
      );

    }

    catch (error) {

      console.log(
        error
      );
    }

    finally {

      setLoading(
        false
      );
    }
  }



  return (

    <div
      className="
      min-h-screen
      bg-slate-50
      px-8
      py-10
      "
    >

      <div
        className="
        max-w-6xl
        mx-auto
        space-y-8
        "
      >



        <div>

          <h1
            className="
            text-3xl
            font-semibold
            text-slate-900
          "
          >

            Market Analysis

          </h1>


          <p
            className="
            text-slate-500
            mt-1
          "
          >

            Analyze stocks in real time

          </p>

        </div>




        <form

          onSubmit={
            searchStock
          }

          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm

          flex
          gap-4
        "
        >

          <input

            value={symbol}

            onChange={
              e =>
              setSymbol(
                e.target.value
              )
            }

            placeholder="AAPL"

            className="
            flex-1
            border
            border-slate-200
            rounded-xl
            px-4
            py-3

            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
          />


          <button

            className="
            bg-indigo-600
            text-white
            px-6
            rounded-xl

            hover:bg-indigo-700

            transition
          "
          >

            Analyze

          </button>

        </form>





        {

          loading && (

            <p>

              Loading...

            </p>
          )
        }





        {

          stock && analysis && (

            <>

              <div
                className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-8
                shadow-sm
              "
              >

                <p
                  className="
                  text-indigo-600
                  text-sm
                  font-medium
                "
                >

                  {
                    stock.symbol
                  }

                </p>


                <h2
                  className="
                  text-3xl
                  font-semibold
                  mt-2
                "
                >

                  {
                    stock.name
                  }

                </h2>


                <p
                  className="
                  text-4xl
                  font-bold
                  mt-4
                "
                >

                  {
                    stock.currency
                  }

                  {" "}

                  {
                    stock.price
                  }

                </p>

              </div>





              <div
                className="
                grid
                md:grid-cols-3
                gap-6
              "
              >

                <MetricCard
                  title="P/E Ratio"
                  value={
                    analysis.pe_ratio
                  }
                />


                <MetricCard
                  title="52W High"
                  value={
                    analysis.week_high
                  }
                />


                <MetricCard
                  title="52W Low"
                  value={
                    analysis.week_low
                  }
                />


                <MetricCard
                  title="Dividend"
                  value={
                    analysis.dividend_yield
                  }
                />


                <MetricCard
                  title="Trend"
                  value={
                    analysis.trend
                  }
                />


                <MetricCard
                  title="Recommendation"
                  value={
                    analysis.recommendation
                  }
                />

              </div>

            </>
          )
        }

      </div>

    </div>
  );
}



function MetricCard(
  { title, value }
) {

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-6
      shadow-sm
      "
    >

      <p
        className="
        text-slate-500
        text-sm
        mb-2
      "
      >

        {title}

      </p>


      <h2
        className="
        text-2xl
        font-semibold
        text-slate-900
      "
      >

        {value}

      </h2>

    </div>
  );
}