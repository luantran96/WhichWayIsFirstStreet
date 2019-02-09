import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from '../reducers/index';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import AuthRoute from './AuthRoute.jsx';

const middleware = applyMiddleware(promise(), thunk, createLogger());
const store = createStore(reducers, middleware);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/" component={Main} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
