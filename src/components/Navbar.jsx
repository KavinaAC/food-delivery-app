import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>🍔 FoodExpress</h2>
      <div>
        <Link to="/restaurants" style={styles.link}>
          Restaurants
        </Link>
        <Link to="/cart" style={styles.cart}>
          🛒 Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#ff512f",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "1.5rem",
  },
  link: {
    marginRight: "1rem",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  cart: {
    background: "#fff",
    color: "#ff512f",
    padding: "6px 12px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;
