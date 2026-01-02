// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/background.jpeg";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  return (
    <div style={styles.container}>
      {/* Ambient background blobs */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>
      <div style={styles.blob3}></div>

      {/* Main card */}
      <div style={styles.content}>
        <div style={styles.card}>
          {/* Icon */}
          <div style={styles.iconContainer}>
            <span style={styles.icon}>🍔</span>
          </div>

          <h1 style={styles.heading}>
            Welcome to <span style={styles.highlight}>FoodieApp</span>!
          </h1>

          <p style={styles.subText}>
            Order your favorite meals from the best restaurants near you.
          </p>

          {/* Buttons */}
          <div style={styles.btnContainer}>
            <button
              style={styles.loginBtn}
              onClick={handleLogin}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 28px rgba(139, 92, 246, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.25)";
              }}
            >
              🔑 Login
            </button>

            <button
              style={styles.signupBtn}
              onClick={handleSignup}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 28px rgba(236, 72, 153, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 6px 20px rgba(236, 72, 153, 0.25)";
              }}
            >
              📝 Sign Up
            </button>
          </div>

          {/* Features */}
          <div style={styles.featuresContainer}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🌟</span>
              <span style={styles.featureText}>Fast Delivery</span>
            </div>
            <div style={styles.featureDivider}></div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🍽️</span>
              <span style={styles.featureText}>Fresh Meals</span>
            </div>
            <div style={styles.featureDivider}></div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>💳</span>
              <span style={styles.featureText}>Easy Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9ccccff",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "1.5rem",
    backgroundImage:`
    linear-gradient(
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.55)
    ),
    url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  },

  /* REMOVE BLOBS (kept empty to avoid JSX edits) */
  blob1: { display: "none" },
  blob2: { display: "none" },
  blob3: { display: "none" },

  content: {
    width: "100%",
    maxWidth: "420px",
  },

  card: {
    backgroundColor: "#e6c6c6ff",
    padding: "2.8rem 2.2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  iconContainer: {
    width: "64px",
    height: "64px",
    margin: "0 auto 1.5rem",
    backgroundColor: "#e23744",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: "2rem",
    color: "#ffffff",
  },

  heading: {
    fontSize: "1.75rem",
    fontWeight: "700",
    marginBottom: "0.75rem",
    color: "#1f2937",
    textAlign: "center",
  },

  highlight: {
    color: "#e23744",
  },

  subText: {
    fontSize: "0.95rem",
    marginBottom: "2rem",
    color: "#292b30ff",
    lineHeight: "1.6",
    textAlign: "center",
  },

  btnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "2rem",
  },

  loginBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e23744",
    color: "#ffffff",
    transition: "background-color 0.2s ease",
  },

  signupBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "1px solid #e23744",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: "#e23744",
    transition: "all 0.2s ease",
  },

  featuresContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e5e7eb",
  },

  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.35rem",
    flex: 1,
  },

  featureIcon: {
    fontSize: "1.3rem",
  },

  featureText: {
    fontSize: "0.8rem",
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "center",
  },

  featureDivider: {
    width: "1px",
    height: "36px",
    backgroundColor: "#e5e7eb",
  },
};


export default Home;
