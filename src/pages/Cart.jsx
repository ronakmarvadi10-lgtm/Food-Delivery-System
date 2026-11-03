
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart({ cart, setCart, user }) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  function change(id, amount) {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, qty: (item.qty || 1) + amount }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function checkout() {
    if (cart.length === 0) {
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: total,
      status: "Order placed",
      date: new Date().toLocaleString(),
    };

    orders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    setCart([]);
    navigate("/orders");
  }

  return (
    <main className="page-container">
      <div className="page-title">
        <span className="eyebrow">YOUR SELECTION</span>
        <h1>Shopping cart</h1>
        <p>Almost there. Your delicious meal awaits.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div>🛒</div>
          <h2>Your cart is feeling lonely</h2>
          <p>Add something tasty from our menu.</p>
          <Link className="button" to="/#menu">
            Explore menu
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-list">
            {cart.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-detail">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} each</p>

                  <div className="qty">
                    <button onClick={() => change(item.id, -1)}>
                      −
                    </button>

                    <b>{item.qty || 1}</b>

                    <button onClick={() => change(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-price">
                  <b>₹{item.price * (item.qty || 1)}</b>

                  <button
                    className="remove"
                    onClick={() =>
                      setCart((oldCart) =>
                        oldCart.filter((food) => food.id !== item.id)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <Link className="back-link" to="/#menu">
              ← Continue shopping
            </Link>
          </section>

          <aside className="summary">
            <h2>Order summary</h2>

            <div>
              <span>Subtotal</span>
              <b>₹{total}</b>
            </div>

            <div>
              <span>Delivery</span>
              <b className="free">FREE</b>
            </div>

            <div>
              <span>Taxes</span>
              <b>Included</b>
            </div>

            <hr />

            <div className="grand-total">
              <span>Total</span>
              <b>₹{total}</b>
            </div>

            <button className="button checkout" onClick={checkout}>
              Place order →
            </button>

            <small>Demo checkout · No real payment is taken</small>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
