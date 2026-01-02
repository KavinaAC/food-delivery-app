import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [toast, setToast] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const snapshot = await getDocs(collection(db, "restaurants"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRestaurants(data);
      setFilteredRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredRestaurants(restaurants);
      return;
    }
    const term = searchTerm.toLowerCase();
    setFilteredRestaurants(
      restaurants.filter(
        (res) =>
          res.name.toLowerCase().includes(term) ||
          res.menu?.some((item) => item.name.toLowerCase().includes(term))
      )
    );
  }, [searchTerm, restaurants]);

  /* ---------------- LIST VIEW ---------------- */
  if (!selectedRestaurant) {
    return (
      <div style={styles.page}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <h2 style={styles.logo}>FoodieApp</h2>
          <div style={styles.buttonGroup}>
            <button style={styles.secondaryBtn} onClick={() => navigate("/")}>
              🏠 Home
            </button>
            <button style={styles.cartBtn} onClick={() => navigate("/cart")}>
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            It’s not just <span style={styles.heroHighlight}>Food</span>, <br />
            It’s an <span style={styles.heroHighlight}>Experience</span>.
          </h1>
          <p style={styles.heroSub}>
            Discover the best food & drinks from top restaurants near you
          </p>

          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchBtn}>🔍</button>
          </div>
        </div>

        {/* Restaurant Cards */}
        <div style={styles.cardGrid}>
          {filteredRestaurants.map((res) => (
            <div
              key={res.id}
              style={styles.restaurantCard}
              onClick={() => setSelectedRestaurant(res)}
            >
              <div style={styles.cardTop}>
                <span style={styles.cardEmoji}>🍽</span>
              </div>
              <h3 style={styles.resName}>{res.name}</h3>
              <p style={styles.meta}>
                {res.cuisine} • ⏱️ {res.deliveryTime} mins
              </p>
            </div>
          ))}
        </div>

        {toast && <div style={styles.toast}>{toast}</div>}
      </div>
    );
  }

  /* ---------------- MENU VIEW ---------------- */
  return (
    <div style={styles.page}>
      <div style={styles.headerContainer}>
        <button style={styles.backBtn} onClick={() => setSelectedRestaurant(null)}>
          ← Back
        </button>
        <div style={styles.buttonGroup}>
          <button style={styles.secondaryBtn} onClick={() => navigate("/")}>
            🏠 Home
          </button>
          <button style={styles.cartBtn} onClick={() => navigate("/cart")}>
            🛒 Cart ({cart.length})
          </button>
        </div>
      </div>

      <div style={styles.menuContent}>
        <h1 style={styles.menuHeading}>{selectedRestaurant.name}</h1>
        <p style={styles.menuSubheading}>{selectedRestaurant.cuisine} • Standard Delivery</p>
        
        <div style={styles.menuGrid}>
          {selectedRestaurant.menu.map((item) => (
            <div key={item.id} style={styles.menuItem}>
              <div style={styles.itemInfo}>
                <strong style={styles.itemName}>{item.name}</strong>
                <p style={styles.itemPrice}>₹{item.price}</p>
              </div>
              <button
                style={styles.addBtn}
                onClick={() => {
                  addToCart({ ...item, restaurant: selectedRestaurant.name });
                  setToast(`${item.name} added to cart`);
                }}
              >
                Add +
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fcfcfc",
    fontFamily: "'Inter', sans-serif",
    paddingBottom: "3rem",
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
  headerContainer: {
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    borderBottom: "1px solid #eee",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "900",
    color: "#dc2626",
    letterSpacing: "-1px",
    margin: 0,
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  hero: {
    background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    padding: "4rem 2rem",
    textAlign: "center",
    color: "#fff",
    marginBottom: "2rem",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "900",
    marginBottom: "1rem",
    lineHeight: 1.1,
  },
  heroHighlight: {
    color: "#fecaca",
  },
  heroSub: {
    fontSize: "1.1rem",
    opacity: 0.9,
    marginBottom: "2rem",
  },
  searchBox: {
    display: "flex",
    maxWidth: "500px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "12px",
    padding: "5px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  searchInput: {
    flex: 1,
    padding: "12px 15px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    borderRadius: "10px",
  },
  searchBtn: {
    background: "#dc2626",
    border: "none",
    padding: "0 20px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  restaurantCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "1rem",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    border: "1px solid #f0f0f0",
  },
  cardTop: {
    height: "150px",
    background: "#fff5f5",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  resName: {
    fontSize: "1.2rem",
    fontWeight: "700",
    margin: "0 0 5px 0",
    color: "#1a1a1a",
  },
  meta: {
    fontSize: "0.9rem",
    color: "#666",
    margin: 0,
  },
  secondaryBtn: {
    background: "#fff",
    color: "#dc2626",
    border: "1px solid #dc2626",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "0.85rem",
  },
  cartBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "0.85rem",
    boxShadow: "0 4px 10px rgba(220, 38, 38, 0.2)",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#666",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "1rem",
  },
  menuContent: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
  menuHeading: {
    fontSize: "2.2rem",
    fontWeight: "900",
    margin: "0 0 5px 0",
    color: "#1a1a1a",
  },
  menuSubheading: {
    color: "#dc2626",
    fontWeight: "600",
    marginBottom: "2rem",
  },
  menuGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  menuItem: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #eee",
  },
  itemName: {
    fontSize: "1.1rem",
    color: "#1a1a1a",
  },
  itemPrice: {
    margin: "5px 0 0 0",
    fontWeight: "700",
    color: "#444",
  },
  addBtn: {
    background: "#fff",
    color: "#dc2626",
    border: "1px solid #dc2626",
    padding: "8px 20px",
    borderRadius: "8px",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  toast: {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1a1a1a",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "600",
    zIndex: 1000,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
};

export default RestaurantList;