import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

export default class Auth {


    auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
        responseType: 'token id_token',
        scope: 'openid profile email offline_access',
        sso: false
    })

    login = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            console.log('hello');
            // do we need all three???
            if(authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            }
            else if (err) {
                hist.replace('/')
            }
        })
    }

    setSession = async authResult => {
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

        // why do we have to set item in localstorage???
        //localStorage.setItem('access_token', authResult.accessToken)
        //localStorage.setItem('id_token', authResult.idToken)
        //localStorage.setItem('expires_at', expiresAt)

        const decoded = jwtDecode(authResult.idToken)
        const user = {
            email : decoded.email,
        }

        const config = {
            headers : {
                //Authorization: `Bearer ${localStorage.getItem('id_token')}`,
                Authorization: `Bearer ${authResult.idToken}`,
                withCredentials: true 
            }
        }
        const addUser = await axios.post(
            //'https://staging2-pawsnfind.herokuapp.com/api/auth',
            'https://staging2-pawsnfind.herokuapp.com/api/auth',
            user,
            config
        ).then( user => {
            localStorage.setItem('user_id', user.data.user_id)
            localStorage.setItem('shelter_id', user.data.shelter_id)
            localStorage.setItem('new_user', user.data.newUser)
            localStorage.setItem('token', user.data.token)
        });
 
        console.log(addUser)
    }
}
