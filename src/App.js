import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App({children}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
};
