// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse()); 
  }, []);

  const statusColors = {
    placed: "#f59e0b",
    delivered: "#22c55e",
    cancelled: "#ef4444",
  };

  if (orders.length === 0)
    return (
      <div style={styles.page}>
        <div style={styles.topBar}>
          <h2 style={styles.logo} onClick={() => navigate("/dashboard")}>FoodieApp</h2>
        </div>
        <div style={styles.emptyContainer}>
          <div style={{fontSize: '4rem'}}>📦</div>
          <h2 style={{color: '#1c1c1c', fontWeight: '800'}}>No orders yet</h2>
          <p style={{color: '#696969', marginBottom: '1.5rem'}}>Hungry? Discover the best food near you.</p>
          <button style={styles.exploreBtn} onClick={() => navigate("/dashboard")}>
            Explore Restaurants
          </button>
        </div>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <h2 style={styles.logo} onClick={() => navigate("/dashboard")}>FoodieApp</h2>
        <button style={styles.homeLink} onClick={() => navigate("/dashboard")}>
          Back to Home
        </button>
      </div>

      <div style={styles.contentWrapper}>
        <h1 style={styles.heading}>Your Orders</h1>
        <div style={styles.orderList}>
          {orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.orderIdText}>Order #{order.id.toString().slice(-6)}</h3>
                  <p style={styles.dateText}>{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: statusColors[order.status] + '15', // Transparent background
                    color: statusColors[order.status],
                    border: `1px solid ${statusColors[order.status]}`,
                  }}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div style={styles.orderDetails}>
                <p style={styles.infoRow}><strong>Items:</strong> {order.items.map((i) => i.name).join(", ")}</p>
                <p style={styles.infoRow}><strong>Deliver to:</strong> {order.address}</p>
              </div>

              <div style={styles.totalRow}>
                <span>Total Amount</span>
                <span style={styles.totalPrice}>₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- PROFESSIONAL RED THEME STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8f9fa",
    fontFamily: "'Inter', sans-serif",
  },
  topBar: {
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "900",
    color: "#e23744",
    letterSpacing: "-1px",
    cursor: "pointer"
  },
  homeLink: {
    background: "transparent",
    border: "none",
    color: "#e23744",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "0.9rem"
  },
  contentWrapper: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#1c1c1c",
    marginBottom: "2rem",
  },
  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  orderCard: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "16px",
    border: "1px solid #eee",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.2rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #f8f9fa"
  },
  orderIdText: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1c1c1c"
  },
  dateText: {
    margin: "4px 0 0 0",
    fontSize: "0.85rem",
    color: "#999"
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  orderDetails: {
    marginBottom: "1rem"
  },
  infoRow: {
    fontSize: "0.9rem",
    color: "#444",
    margin: "8px 0",
    lineHeight: "1.4"
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1rem",
    borderTop: "1px dashed #eee",
    marginTop: "1rem",
    fontSize: "1rem",
    fontWeight: "700",
    color: "#666"
  },
  totalPrice: {
    fontSize: "1.2rem",
    color: "#e23744",
    fontWeight: "900"
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '100px 20px'
  },
  exploreBtn: {
    background: "#e23744",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default Orders;