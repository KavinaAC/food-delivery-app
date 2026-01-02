import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order!");
      return;
    }
    if (!address) {
      alert("Please enter delivery address!");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const total = cart.reduce((sum, item) => sum + item.price, 0);

      // Save order in Firestore
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        total,
        address,
        status: "placed", // order status
        createdAt: Timestamp.now(),
      });

      // Clear cart after order
      await clearCart();

      alert("🎉 Order placed successfully!");
      navigate("/orders"); // redirect to orders page
    } catch (error) {
      console.error(error);
      alert("❌ Error placing order: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 😔</p>
      ) : (
        <div style={styles.cartList}>
          {cart.map((item, idx) => (
            <div key={idx} style={styles.cartItem}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div style={styles.total}>
            Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}
          </div>

          <div style={styles.addressContainer}>
            <label>Delivery Address:</label>
            <textarea
              style={styles.textarea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address..."
            />
          </div>

          <button
            style={styles.placeBtn}
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem",
    background: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cartList: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
  total: {
    marginTop: "1rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textAlign: "right",
  },
  addressContainer: {
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "vertical",
  },
  placeBtn: {
    marginTop: "1.5rem",
    background: "#ff512f",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
};

export default Checkout;
