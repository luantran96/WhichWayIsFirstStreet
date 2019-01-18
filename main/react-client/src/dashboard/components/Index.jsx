import { Provider } from 'react-redux';
import { applyMiddleware, createStore} from 'redux';    
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createLogger } from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from '../reducers/index';

import Main from './Main.jsx';
import Login from './../../login/components/Login.jsx';

const middleware = applyMiddleware(promise(), thunk, createLogger());
const store = createStore(
  reducers,
  middleware
);

ReactDOM.render( 
    <BrowserRouter>
      <Provider store={store}>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
      </Provider>
    </BrowserRouter>
, document.getElementById('app')
);