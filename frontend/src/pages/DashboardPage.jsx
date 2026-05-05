import {
  useEffect,
  useState
} from "react";

import api from "../api/client";

import "../Styles/Dashboard.css";

import {

  PieChart,
  Pie,

  BarChart,
  Bar,

  XAxis,
  YAxis,

  Tooltip,

  ResponsiveContainer

} from "recharts";


export default function DashboardPage() {

  const [

    summary,

    setSummary

  ] = useState({

    total_spent: 0,

    monthly_spent: 0,

    transaction_count: 0
  });


  const [

    categories,

    setCategories

  ] = useState([]);


  const [

    monthly,

    setMonthly

  ] = useState([]);


  useEffect(() => {

    loadData();

  }, []);


  async function loadData() {

    try {

      const [

        summaryRes,

        categoryRes,

        monthlyRes

      ] = await Promise.all([

        api.get(
          "/analytics/summary"
        ),

        api.get(
          "/analytics/categories"
        ),

        api.get(
          "/analytics/monthly"
        )

      ]);


      setSummary(
        summaryRes.data
      );


      setCategories(
        categoryRes.data
      );


      setMonthly(
        monthlyRes.data
      );

    }

    catch (error) {

      console.log(
        error
      );
    }
  }



  return (

    <div className="dashboard-page">



      <header className="dashboard-header">

        <div className="container">

          <h1>

            WealthCheck

          </h1>


          <nav>

            <a href="not found">
              Dashboard
            </a>

            <a href="not found">
              Expenses
            </a>

            <a href="not found">
              Market
            </a>

          </nav>

        </div>

      </header>






      <main className="container">

        <div className="hero">

          <p>

            Financial Intelligence

          </p>


          <h2>

            Dashboard

          </h2>


          <span>

            Track expenses
            and spending trends

          </span>

        </div>






        <div className="stats-grid">

          <Card
            title="Total Spent"
            value={
              `₹${summary.total_spent}`
            }
          />


          <Card
            title="Monthly"
            value={
              `₹${summary.monthly_spent}`
            }
          />


          <Card
            title="Transactions"
            value={
              summary.transaction_count
            }
          />

        </div>







        <div className="charts-grid">

          <ChartCard
            title="Category Breakdown"
          >

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie

                  data={
                    categories
                  }

                  dataKey="amount"

                  nameKey="category"
                />

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </ChartCard>






          <ChartCard
            title="Monthly Spending"
          >

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart
                data={
                  monthly
                }
              >

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                />

              </BarChart>

            </ResponsiveContainer>

          </ChartCard>

        </div>

      </main>






      <footer className="dashboard-footer">

        Welcome to WealthCheck - Your Personal Finance Dashboard

      </footer>

    </div>
  );
}



function Card(
  { title, value }
) {

  return (

    <div className="stat-card">

      <p>

        {title}

      </p>


      <h2>

        {value}

      </h2>

    </div>
  );
}



function ChartCard(
  { title, children }
) {

  return (

    <div className="chart-card">

      <h3>

        {title}

      </h3>


      {children}

    </div>
  );
}