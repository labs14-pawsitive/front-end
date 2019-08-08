import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({
        name: "Someone",
        address: { city: 'Somewhere', country:'usa', line1:'111 st', line2:'111 st', postal_code:'1234', state:'ny'},
        email: "eee@eee.com",
        phone:"222-222-2222"
   
    });

    axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/api/stripe/donate`, { token: token.id,
            data: {amount: 5000, shelter_id: 1, user_id: 1}
          })
          .then(res => {
              console.log(res);
          })
  
   // if (response.ok) console.log("Purchase Complete!")
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);