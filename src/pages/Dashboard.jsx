// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <div style={styles.container}>
      {/* Food Icons Row */}
      <div style={styles.foodRow}>
        <span style={styles.foodIcon}>🍔</span>
        <span style={styles.foodIcon}>🍕</span>
        <span style={styles.foodIcon}>🍟</span>
        <span style={styles.foodIcon}>🌮</span>
        <span style={styles.foodIcon}>🍜</span>
        <span style={styles.foodIcon}>🥗</span>
        <span style={styles.foodIcon}>🍩</span>
      </div>

      {/* Greeting */}
      <h1 style={styles.heading}>
        Welcome, <span style={styles.highlight}>{user?.name}</span>
      </h1>

      <p style={styles.subHeading}>
        Delicious food delivered to your doorstep 🍽️
      </p>

      {/* Dashboard Cards */}
      <div style={styles.cardContainer}>
        <div
          style={{ ...styles.card, ...styles.redCard }}
          onClick={() => navigate("/restaurants")}
        >
          <div style={styles.cardIcon}>🍽</div>
          Explore Restaurants
        </div>

        <div
          style={{ ...styles.card, ...styles.blueCard }}
          onClick={() => navigate("/orders")}
        >
          <div style={styles.cardIcon}>📦</div>
          My Orders
        </div>

        <div
          style={{ ...styles.card, ...styles.greenCard }}
          onClick={() => navigate("/cart")}
        >
          <div style={styles.cardIcon}>🛒</div>
          My Cart ({cart.length})
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2.5rem 1.5rem",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  /* Food Icons */
  foodRow: {
    display: "flex",
    gap: "1.2rem",
    marginBottom: "1.8rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  foodIcon: {
    fontSize: "2.1rem",
    background: "#fff",
    borderRadius: "50%",
    padding: "0.7rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    cursor: "default",
    transition: "transform 0.25s ease",
  },

  heading: {
    fontSize: "2.4rem",
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: "0.4rem",
    textAlign: "center",
  },

  highlight: {
    color: "#e23744", // Zomato red
  },

  subHeading: {
    color: "#6b7280",
    marginBottom: "3rem",
    fontSize: "1.05rem",
    textAlign: "center",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2rem",
    width: "100%",
    maxWidth: "1000px",
  },

  card: {
    borderRadius: "20px",
    padding: "2.8rem 1.8rem",
    textAlign: "center",
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#ffffff",
    cursor: "pointer",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    transition: "all 0.35s ease",
  },

  cardIcon: {
    fontSize: "2.5rem",
    marginBottom: "0.8rem",
  },

  redCard: {
    background: "linear-gradient(135deg, #e23744, #f43f5e)",
  },

  blueCard: {
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
  },

  greenCard: {
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
  },
};

export default Dashboard;
