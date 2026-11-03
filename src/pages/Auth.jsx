
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Auth({ type, login }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  let title = "Welcome back";

  if (type === "register") {
    title = "Create your account";
  } else if (type === "forgot") {
    title = "Reset password";
  }

  function submit(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (type === "register") {
      let existingUser = users.find((u) => u.email === email);

      if (existingUser) {
        setMessage("This email is already registered. Please login.");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      login({ name, email });
      navigate("/");
    } else if (type === "login") {
      let user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setMessage("Email or password is incorrect.");
        return;
      }

      login({ name: user.name, email: user.email });
      navigate("/");
    } else {
      setMessage(
        "Password reset is a demo only. To change your password, login and use My Profile."
      );
    }
  }

  return (
    <main className="auth-layout">
      <div className="auth-art">
        <span className="eyebrow">A LITTLE JOY IN EVERY BITE</span>

        <h2>
          Good food is
          <br />
          <em>always a good idea.</em>
        </h2>

        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
          alt="Delicious fresh meal"
        />

        <p>Fresh picks. Happy moments. Delivered.</p>
      </div>

      <form className="form-box auth-box" onSubmit={submit}>
        <span className="eyebrow">FOODZONE ACCOUNT</span>

        <h2>{title}</h2>

        <p className="form-intro">
          {type === "register"
            ? "Join us and make mealtime better."
            : "Sign in to continue your delicious journey."}
        </p>

        {type === "register" && (
          <label>
            Full name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>
        )}

        <label>
          Email address
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        {type !== "forgot" && (
          <label>
            Password
            <input
              required
              minLength="6"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </label>
        )}

        <button className="button checkout" type="submit">
          {type === "register"
            ? "Create account"
            : type === "forgot"
            ? "Continue"
            : "Login"}{" "}
          →
        </button>

        {message && <p className="message">{message}</p>}

        {type === "login" && (
          <p className="auth-switch">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        )}

        <p className="auth-switch">
          {type === "register"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <Link to={type === "register" ? "/login" : "/register"}>
            {type === "register" ? "Login" : "Sign up"}
          </Link>
        </p>

        <small className="demo-note">
          Demo only: account details are saved in this browser, not a secure
          server.
        </small>
      </form>
    </main>
  );
}

export default Auth;
