import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import UserStore from './store/UserStore';
import FilmStore from './store/FilmStore'

export const Context = createContext(null);
ReactDOM.render(
    <Context.Provider value={{
      user: new UserStore(),
      film: new FilmStore() 
    }}>
      <App/>
    </Context.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();