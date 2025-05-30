import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import {legacy_createStore , applyMiddleware,compose} from 'redux';
import {thunk} from 'redux-thunk';
import reducers from './reducers';
import './index.css';


import App from './App.jsx';


const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));
const root = createRoot(document.getElementById('root'));
root.render(
    
    <Provider store={store}>
        <App />
    </Provider>
    
);
