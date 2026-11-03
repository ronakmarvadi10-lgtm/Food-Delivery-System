
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  function protect(page) {
    if (user) {
      return page;
    }

    return <Navigate to="/login" replace />;
  }

  const cartCount = cart.reduce((total, item) => {
    return total + (item.qty || 1);
  }, 0);

  return (
    <>
      <Navbar
        user={user}
        cartCount={cartCount}
        logout={logout}
      />

      <Routes>
        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} />}
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Auth type="login" login={login} />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Auth type="register" login={login} />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={<Auth type="forgot" login={login} />}
        />

        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} user={user} />
          }
        />

        <Route
          path="/orders"
          element={protect(<Orders />)}
        />

        <Route
          path="/dashboard"
          element={protect(<Dashboard user={user} cart={cart} />)}
        />

        <Route
          path="/profile"
          element={
            protect(
              <Profile user={user} updateUser={login} />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
