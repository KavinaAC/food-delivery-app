// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/loginpg.jpeg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      alert("✅ Signup successful!");
      navigate("/Dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Floating background blobs */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      {/* Card */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          style={styles.input}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={styles.btn}
          onClick={handleSignup}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 12px 28px rgba(139, 92, 246, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.25)";
          }}
        >
          📝 Sign Up
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span style={styles.loginLink} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
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
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "1rem",

    backgroundImage: `
      linear-gradient(
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.65)
      ),
      url(${bgImage})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  /* Disable blobs to keep consistency */
  blob1: { display: "none" },
  blob2: { display: "none" },

  card: {
    backgroundColor: "#ffffff",
    padding: "2.75rem 2.25rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
  },

  heading: {
    fontSize: "1.75rem",
    fontWeight: "700",
    marginBottom: "1.75rem",
    color: "#e23744",
    letterSpacing: "-0.02em",
  },

  input: {
    width: "100%",
    padding: "13px 14px",
    marginBottom: "1.1rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "#ffffff",
  },

  btn: {
    width: "100%",
    padding: "14px 0",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    color: "#ffffff",
    backgroundColor: "#e23744",
    transition: "background-color 0.2s ease",
  },

  loginText: {
    marginTop: "1.4rem",
    fontSize: "0.85rem",
    color: "#6b7280",
  },

  loginLink: {
    color: "#e23744",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Signup;
