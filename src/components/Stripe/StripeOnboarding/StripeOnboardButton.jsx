import React from "react";

// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";


class StripeConnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            test: {
                foo: 'bar',
            }

        }
    }

        // fire off fetchStripeUserID and then storeStripeUserID in componentDidUpdate of the URI page

        fetchStripeUserID() {

            req.body = {
                client_secret: process.env.REACT_APP_STRIPE_TEST_CLIENT_SECRET, // in pawsnfind stripe dashboard
                code: process.env.REACT_APP_STRIPE_TEST_USER_ID, // will be returned in params of URI page after form is completed
                grant_type: "authorization_code",
            }

            axios
            .post(`https://connect.stripe.com/oauth/token`, req.body )
            .then( result => {
                console.log(result)
            })
            .catch( error => {
                console.log(error)
            })

            // STRIPE USER ID RETURNED 

            // THEN STORE STRIPE USER ID IN PAWS DB
        };

        storeStripeUserID() {

            req.body = { 
                account_id: process.env.REACT_APP_STRIPE_TEST_ACCOUNT_ID // receive from fetchStripeUserID
            }

            const id = 3;

            axios
            .post(`localhost:8000/api/shelters/${id}/account`, req.body ) // change to ${process.env.REACT_APP_BACKEND_URL}
            .then( result => {
                console.log(result)
            })
            .catch( error => {
                console.log(error)
            })

        };

        render() {

            // const { classes } = this.props
            // const customStyle = {
            //     connectButton: {
            //         backgroundImage: `url(${StripeImage})`
            //     },
            // }

            return (
                <>

                    <a
                        href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=${process.env.REACT_APP_STRIPE_TEST_CLIENT_ID}&state={STATE_VALUE}`}
                    // style = { customStyle.connectButton }
                    >
                        Stripe Connect
                    </a>

                </>
            )
        }

};

export default StripeConnect;