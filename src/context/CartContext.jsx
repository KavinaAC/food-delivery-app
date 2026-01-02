// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]); // clear cart if logged out
      return;
    }

    const fetchCart = async () => {
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        setCart(cartSnap.data().items || []);
      } else {
        // create empty cart for new user
        await setDoc(cartRef, { items: [] });
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  // Add item to cart
  const addToCart = async (item) => {
    if (!user) return alert("Login first to add items to cart!");
    const cartRef = doc(db, "carts", user.uid);

    // Update Firestore
    await updateDoc(cartRef, { items: arrayUnion(item) });
    setCart((prev) => [...prev, item]);
  };

  // Remove item from cart
  const removeFromCart = async (item) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, { items: arrayRemove(item) });
    setCart((prev) => prev.filter((i) => i.id !== item.id));
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, { items: [] });
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
