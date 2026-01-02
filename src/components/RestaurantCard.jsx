import React from "react";
import { useCart } from "../context/CartContext";

const RestaurantCard = ({ restaurant }) => {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
      }}
    >
      <h3>{restaurant.name}</h3>
      <p>Cuisine: {restaurant.cuisine}</p>
      <p>Delivery Time: {restaurant.deliveryTime} mins</p>

      <h4>Menu</h4>

      {/* 🔥 THIS IS THE MOST IMPORTANT PART */}
      {restaurant.menu && restaurant.menu.length > 0 ? (
        restaurant.menu.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span>
              {item.name} – ₹{item.price}
            </span>

            {/* ✅ ADD BUTTON */}
            <button onClick={() => addToCart(item)}>
              Add
            </button>
          </div>
        ))
      ) : (
        <p>No menu items</p>
      )}
    </div>
  );
};

export default RestaurantCard;
