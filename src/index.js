import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import App from './App'
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Cartoon from './pages/Cartoon';
import Sport from './pages/Sport';
import Collections from './pages/Collections';
import Profile from './pages/Profile';
import Subscribe from './pages/Subscribe';
import TVchannel from './pages/TVchannel';


ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/cartoon" component={Cartoon}></Route>
        <Route path="/series" component={Series}></Route>
        <Route path="/sport" component={Sport}></Route>
        <Route path="/collections" component={Collections}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/subscribe" component={Subscribe}></Route>
        <Route path="/TVchannel" component={TVchannel}></Route>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
