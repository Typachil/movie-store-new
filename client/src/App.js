import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

export default function App({children}) {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider value = {{
      token, login, logout, userId, isAuthenticated
    }}>
      <Header />
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
      <Footer />
    </AuthContext.Provider>
  )
};
