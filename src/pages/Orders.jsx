
import React from "react";
import { Link } from "react-router-dom";

function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <main className="page-container">
      <div className="page-title">
        <span className="eyebrow">THANK YOU FOR ORDERING</span>
        <h1>My orders</h1>
        <p>All your tasty choices in one place.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div>🍽️</div>
          <h2>No orders yet</h2>
          <p>Your next favourite meal is waiting.</p>

          <Link className="button" to="/#menu">
            Browse menu
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-head">
                <div>
                  <small>ORDER #{String(order.id).slice(-6)}</small>
                  <h3>{order.date}</h3>
                </div>

                <span className="status">
                  ✓ {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <span>
                      {item.name} × {item.qty || 1}
                    </span>

                    <b>₹{item.price * (item.qty || 1)}</b>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <span>Total paid (demo)</span>
                <b>₹{order.total}</b>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;
