import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

import "../Styles/login.css";

export default function LoginPage() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    try {

      console.log("Trying login...");

      const response = await api.post(
        "/users/login",
        {
          email,
          password
        }
      );

      console.log(
        "LOGIN SUCCESS:",
        response.data
      );

      login(
        response.data.access_token
      );

      navigate("/dashboard");

    }

    catch (err) {

      console.log(
        "LOGIN ERROR:",
        err.response
      );

      setError(
        err.response?.data?.detail
        ||
        err.message
      );
    }
  }

  return (

    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        <h1>Welcome Back</h1>
        <p className="subtitle">
          Login to continue
        </p>

        <input
          className="input-field"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="input-field"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button className="login-btn">
          Login
        </button>

        <p className="register-text">
          Not registered?
        </p>

        <button
          type="button"
          className="register-btn"
          onClick={() => navigate("/register")}
        >
          Register
        </button>

        <p className="error-text">
          {error}
        </p>

      </form>

    </div>
  );
}