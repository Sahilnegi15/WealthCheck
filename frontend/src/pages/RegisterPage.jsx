import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api
from "../api/client";

import "../Styles/register.css";


export default function
RegisterPage() {

  const navigate =
    useNavigate();


  const [
    form,
    setForm
  ] = useState({

    name: "",

    email: "",

    password: ""
  });


  async function submit(
    e
  ) {

    e.preventDefault();


    await api.post(

      "/users/register",

      form
    );


    navigate(
      "/"
    );
  }


  return (

    <div className="register-container">

      <form
        className="register-form"
        onSubmit={
          submit
        }
      >

        <h1>Create Account</h1>

        <p className="subtitle">
          Join us today
        </p>


        <input
          className="input-field"

          placeholder="Name"

          onChange={

            e =>
            setForm({

              ...form,

              name:
              e.target.value
            })
          }
        />


        <input
          className="input-field"

          placeholder="Email"

          onChange={

            e =>
            setForm({

              ...form,

              email:
              e.target.value
            })
          }
        />


        <input
          className="input-field"

          type="password"

          placeholder="Password"

          onChange={

            e =>
            setForm({

              ...form,

              password:
              e.target.value
            })
          }
        />


        <button
          className="register-btn-main"
          type="submit"
        >

          Register

        </button>


        <p className="login-text">
          Already have an account?
        </p>


        <button
          type="button"
          className="back-btn"

          onClick={() =>
            navigate("/")
          }
        >

          Back to Login

        </button>

      </form>

    </div>
  );
}