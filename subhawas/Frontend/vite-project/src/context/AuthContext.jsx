import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user info
  const [loading, setLoading] = useState(true); // Controls loading state

  // Function to fetch the current user (called on load + after login)
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/me'); // backend sends user info from cookie
      setUser(data); // set user info globally
    } catch (err) {
      setUser(null); // if error (unauthenticated), reset user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Auto-fetch user on first mount
  }, []);

  // Provide user, loading, and fetchUser function to the rest of the app
  return (
    <AuthContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Optional shortcut hook for convenience
export const useAuth = () => useContext(AuthContext);






export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const { data } = await axios.get('/api/cart/count', { withCredentials: true });
      setCartCount(data.count);
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
