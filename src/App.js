import React from 'react';
import './App.css';
import Header from "./components/Header";
import Slider from "./components/Slider";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App({children}) {
  return (
    <>
      <Header />
      <Slider />
      {children}
      <Main />
      <Footer />
    </>
  )
}

export default App;
