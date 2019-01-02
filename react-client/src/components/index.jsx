import { Provider } from 'react-redux';
import { applyMiddleware, createStore} from 'redux';    
import { createLogger } from 'redux-logger';
import React from 'React';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './../reducers/index';

import App from './App.jsx';

const middleware = applyMiddleware(promise(), thunk, createLogger());
const store = createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app')
);