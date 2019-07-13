import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Auth from './components/auth/Auth';
import {Route} from 'react-router-dom';
import Callback from './components/callback/Callback';

const auth = new Auth()


//what does this do?
const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

function App() {
  return (
    <div className="App">
       <h2>Pawsnfind app</h2>
       <Route
        exact path ='/'
        render={props => 
          <Login {...props} auth={auth}/>
        }
       />
       <Route 
        path='/callback'
        render={props => {
          handleAuthentication(props);
          return <Callback {...props}/>
        }} 

       />
    </div>
  );
}

export default App;
