
import React from "react";

function FoodCard({ food, addToCart }) {
  return (
    <article className="food-card">
      <div className="food-image">
        <img src={food.image} alt={food.name} />
        <span>{food.category}</span>
      </div>

      <div className="food-info">
        <h3>{food.name}</h3>

        <div className="food-bottom">
          <strong>₹{food.price}</strong>

          <button onClick={() => addToCart(food)}>
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;
