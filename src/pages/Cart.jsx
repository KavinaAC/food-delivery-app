import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (!address.trim()) {
      alert("Please enter delivery address!");
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      items: cart,
      total,
      address,
      status: "placed",
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    setCheckoutMsg("✅ Order placed successfully!");
    clearCart();
    setAddress("");

    setTimeout(() => navigate("/orders"), 1000);
  };

  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        <div style={styles.blob3}></div>

        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>
            Looks like you haven't added anything yet.
          </p>

          <button
            style={styles.homeBtn}
            onClick={() => navigate("/dashboard")}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)";
            }}
          >
            ← Go to Home
          </button>
        </div>
      </div>
    );
  }

  /* ================= CART WITH ITEMS ================= */
  return (
    <div style={styles.container}>
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>
      <div style={styles.blob3}></div>

      <div style={styles.contentWrapper}>
        <h1 style={styles.heading}>🛒 Your Cart</h1>

        <div style={styles.cartGrid}>
          {/* LEFT SIDE - ITEMS */}
          <div style={styles.itemsSection}>
            {cart.map((item, index) => (
              <div key={index} style={styles.cartItem}>
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.restaurantName}>🏪 {item.restaurant}</p>
                </div>

                <div style={styles.itemActions}>
                  <span style={styles.itemPrice}>₹{item.price}</span>
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeFromCart(item)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 2px 6px rgba(239, 68, 68, 0.3)";
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div style={styles.summarySection}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal</span>
                <span style={styles.summaryValue}>₹{total}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Delivery Fee</span>
                <span style={styles.summaryValue}>₹40</span>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>₹{total + 40}</span>
              </div>

              <div style={styles.addressSection}>
                <label style={styles.inputLabel}>Delivery Address</label>
                <input
                  type="text"
                  placeholder="Enter delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={styles.addressInput}
                />
              </div>

              <button 
                style={styles.checkoutBtn} 
                onClick={handleCheckout}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 16px rgba(16, 185, 129, 0.3)";
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {checkoutMsg && <div style={styles.toast}>{checkoutMsg}</div>}
    </div>
  );
};

/* ================= STYLES ================= */

/* ---------------- COMPACT RED THEME CART STYLES ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem 1rem",
    background: "#fffafb", // Subtle warm white background
    fontFamily: "'Inter', sans-serif",
    color: "#1e293b",
  },

  contentWrapper: {
    maxWidth: "1000px", // More compact container
    margin: "0 auto",
  },

  heading: {
    textAlign: "left",
    color: "#0f172a",
    fontSize: "2rem",
    fontWeight: "800",
    marginBottom: "2rem",
    borderBottom: "3px solid #dc2626", // Red accent line
    display: "inline-block",
    paddingBottom: "8px",
  },

  /* EMPTY CART STATE */
  emptyCard: {
    margin: "10vh auto",
    maxWidth: "400px",
    background: "#fff",
    padding: "3rem 2rem",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid #f1f5f9",
  },

  emptyIcon: {
    fontSize: "3.5rem",
    marginBottom: "1rem",
  },

  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e293b",
  },

  emptyText: {
    color: "#64748b",
    fontSize: "0.95rem",
    marginBottom: "2rem",
  },

  homeBtn: {
    padding: "12px 24px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
  },

  /* CART GRID */
  cartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 350px", // Fixed width for summary, flexible for items
    gap: "2rem",
    alignItems: "start",
  },

  itemsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  cartItem: {
    background: "#fff",
    padding: "1.2rem",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #f1f5f9",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },

  itemName: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#0f172a",
  },

  restaurantName: {
    fontSize: "0.85rem",
    color: "#dc2626", // Red restaurant name
    fontWeight: "600",
    marginTop: "4px",
  },

  itemActions: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },

  itemPrice: {
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#1e293b",
  },

  removeBtn: {
    background: "transparent",
    color: "#94a3b8", // Subdued remove button
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.8rem",
    transition: "all 0.2s",
  },

  /* SUMMARY SECTION */
  summaryCard: {
    background: "#fff",
    padding: "1.8rem",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #f1f5f9",
    position: "sticky",
    top: "20px",
  },

  summaryTitle: {
    fontSize: "1.3rem",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "1.5rem",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.8rem",
    fontSize: "0.95rem",
  },

  summaryLabel: { color: "#64748b" },
  summaryValue: { fontWeight: "600", color: "#1e293b" },

  divider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "1rem 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },

  totalLabel: { fontSize: "1.1rem", fontWeight: "800" },
  totalValue: { fontSize: "1.3rem", fontWeight: "800", color: "#dc2626" },

  addressSection: { marginBottom: "1.5rem" },

  inputLabel: {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#475569",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
  },

  addressInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    outline: "none",
    fontSize: "0.95rem",
    background: "#f8fafc",
    boxSizing: "border-box", // Important for width: 100%
  },

  checkoutBtn: {
    width: "100%",
    padding: "14px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.2)",
    transition: "background 0.2s",
  },

  toast: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#0f172a",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "12px",
    zIndex: 1000,
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
};
export default Cart;