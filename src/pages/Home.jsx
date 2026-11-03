
import React, { useState } from "react";
import foods from "../data";
import FoodCard from "../components/FoodCard";

function Home({ cart, setCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(foods.map((food) => food.category))];

  function addToCart(food) {
    const found = cart.find((item) => item.id === food.id);

    if (found) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
  }

  const filteredFoods = foods.filter((food) => {
    const matchName = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || food.category === category;

    return matchName && matchCategory;
  });

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">FRESH • FAST • DELICIOUS</span>

          <h1>
            Good food.
            <br />
            <em>Good mood.</em>
          </h1>

          <p>
            Your favourite meals, freshly made and delivered right to your door.
          </p>

          <a href="#menu" className="button hero-button">
            Explore menu →
          </a>

          <div className="hero-note">
            <span>★★★★★</span> Loved by hungry people everywhere
          </div>
        </div>

        <div className="hero-art">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000"
            alt="Fresh pizza"
          />

          <div className="floating-tag">
            <b>Made fresh</b>
            <small>Just for you ✨</small>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div>
          🚴 <span><b>Quick delivery</b><small>At your doorstep</small></span>
        </div>

        <div>
          🥬 <span><b>Fresh ingredients</b><small>Quality you can taste</small></span>
        </div>

        <div>
          ❤️ <span><b>Made with love</b><small>Every single order</small></span>
        </div>
      </section>

      <section className="menu section" id="menu">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT ARE YOU CRAVING?</span>
            <h2>Explore our menu</h2>
            <p>Find your new favourite bite.</p>
          </div>

          <div className="search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search delicious food..."
            />
          </div>
        </div>

        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "category active" : "category"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="food-list">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              addToCart={addToCart}
            />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <p className="empty">No food found. Try another search.</p>
        )}
      </section>

      <section className="callout">
        <div>
          <span className="eyebrow">YOUR NEXT FAVOURITE MEAL</span>
          <h2>Hungry? We've got you.</h2>
          <p>Pick something delicious and let us handle the rest.</p>
        </div>

        <a href="#menu" className="button">
          Order something yummy →
        </a>
      </section>

      <footer className="footer">
        <a href="/" className="logo">
          food<span>zone</span>
        </a>

        <p>Good food, good mood. Made for your cravings.</p>
        <small>© 2026 FoodZone · Student frontend project</small>
      </footer>
    </>
  );
}

export default Home;
