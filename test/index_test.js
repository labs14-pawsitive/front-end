import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { withRouter, BrowserRouter as Router } from "react-router-dom";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../src/reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);

const hist = createBrowserHistory();
const AppWithRouter = withRouter(App);

ReactDOM.render(
<Provider store = {store}>
    <Router history={hist}>
        <AppWithRouter />
    </Router>
</Provider>,
document.getElementById('root'));


