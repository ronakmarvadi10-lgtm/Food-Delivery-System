
import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ user, cart }) {
  const totalItems = cart.reduce(
    (total, item) => total + (item.qty || 1),
    0
  );

  return (
    <main className="page-container">
      <div className="page-title">
        <span className="eyebrow">YOUR FOODZONE</span>

        <h1>Hey, {user.name.split(" ")[0]} 👋</h1>

        <p>Ready for something delicious today?</p>
      </div>

      <div className="dashboard-boxes">
        <Link className="dashboard-box" to="/#menu">
          <span>🍕</span>
          <h3>Explore menu</h3>
          <p>Find your next favourite meal.</p>
        </Link>

        <Link className="dashboard-box" to="/cart">
          <span>🛒</span>
          <h3>Your cart</h3>
          <p>{totalItems} items waiting for you.</p>
        </Link>

        <Link className="dashboard-box" to="/orders">
          <span>📦</span>
          <h3>My orders</h3>
          <p>Check your order history.</p>
        </Link>

        <Link className="dashboard-box" to="/profile">
          <span>👤</span>
          <h3>My profile</h3>
          <p>Update your details and password.</p>
        </Link>
      </div>
    </main>
  );
}

export default Dashboard;
