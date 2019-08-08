import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class StripeForm extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripeForm;
