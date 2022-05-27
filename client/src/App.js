import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      check().then(data => {
        user.setUser(data);
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [user.isAuth])

  if (loading) {
    return <Spinner animation='grow'/>
  }
  return (
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <AppRouter/>
        </ErrorBoundary>
        <Footer />
      </BrowserRouter>
  )
});

export default App;