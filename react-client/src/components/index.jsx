import { Provider } from 'react-redux';
import { applyMiddleware, createStore} from 'redux';    
import { createLogger } from 'redux-logger';
import React from 'React';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from '../reducers/index';

import App from './App.jsx';

const middleware = applyMiddleware(promise(), thunk, createLogger());
const store = createStore(
    reducers, 
    middleware,
    );

    let currentState;

    // store.subscribe(() => {
    //     let previousState = currentState;
    //     let currentState = store.getState();

    //     if(previousState.app.restaurantToAdd !== currentState.app.restaurantToAdd) {  
    //       console.log('state changed ', currentState);
    //       store.dispatch({type: 'FETCH_RESTAURANTS'});
    //     }
    // });

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app')
);