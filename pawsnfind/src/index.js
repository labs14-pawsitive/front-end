import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import history from './components/history'



const AppwithRouter = withRouter(App);

ReactDOM.render(
    <Router history={history}>
        <AppwithRouter />
    </Router>,
    document.getElementById('root')
);


