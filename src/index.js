import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/series" component={Series}></Route>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
