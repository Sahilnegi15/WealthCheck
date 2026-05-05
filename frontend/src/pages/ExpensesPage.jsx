import {
  useEffect,
  useState
} from "react";

import api
from "../api/client";


export default function
ExpensesPage() {

  const [
    expenses,
    setExpenses
  ] = useState([]);


  const [
    amount,
    setAmount
  ] = useState("");


  const [
    category,
    setCategory
  ] = useState("");


  const [
    note,
    setNote
  ] = useState("");


  useEffect(() => {

    loadExpenses();

  }, []);


  async function
  loadExpenses() {

    const res =
      await api.get(
        "/expenses"
      );

    setExpenses(
      res.data
    );
  }


  async function
  addExpense(e) {

    e.preventDefault();


    await api.post(

      "/expenses",

      {
        amount:
          Number(amount),

        category,

        note
      }
    );


    setAmount("");
    setCategory("");
    setNote("");


    loadExpenses();
  }


  async function
  deleteExpense(id) {

    await api.delete(

      `/expenses/${id}`
    );


    loadExpenses();
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

            Expenses

          </h1>


          <p
            className="
            text-slate-500
            mt-1
          "
          >

            Track and manage your spending

          </p>

        </div>



        <form

          onSubmit={
            addExpense
          }

          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          p-6
        "
        >

          <div
            className="
            grid
            md:grid-cols-4
            gap-4
          "
          >

            <input

              placeholder="Amount"

              value={amount}

              onChange={
                e =>
                setAmount(
                  e.target.value
                )
              }

              className="
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


            <input

              placeholder=
                "Category"

              value={
                category
              }

              onChange={
                e =>
                setCategory(
                  e.target.value
                )
              }

              className="
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


            <input

              placeholder=
                "Note"

              value={note}

              onChange={
                e =>
                setNote(
                  e.target.value
                )
              }

              className="
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
              rounded-xl
              px-4
              py-3
              font-medium
              hover:bg-indigo-700
              transition
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

            expenses.map(

              expense => (

                <div

                  key={
                    expense.id
                  }

                  className="
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  p-5
                  shadow-sm

                  flex
                  justify-between
                  items-center
                "
                >

                  <div
                    className="
                    space-y-1
                  "
                  >

                    <p
                      className="
                      text-sm
                      text-indigo-600
                      font-medium
                    "
                    >

                      {
                        expense.category
                      }

                    </p>


                    <p
                      className="
                      text-2xl
                      font-semibold
                      text-slate-900
                    "
                    >

                      ₹
                      {
                        expense.amount
                      }

                    </p>


                    <p
                      className="
                      text-slate-500
                      text-sm
                    "
                    >

                      {
                        expense.note
                      }

                    </p>

                  </div>



                  <button

                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }

                    className="
                    bg-emerald-50
                    text-emerald-700
                    px-4
                    py-2
                    rounded-xl
                    font-medium

                    hover:bg-red-50
                    hover:text-red-600

                    transition
                  "

                  >

                    Delete

                  </button>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}