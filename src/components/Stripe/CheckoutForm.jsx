import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            name: "",
        }
    }
    handleSubmit = e => {
        e.preventDefault();
    
        let { token } = await this.props.stripe.createToken({name: this.state.name})
        let amount = this.state.amount;
        let response =
            await fetch('http://localhost:8000/api/stripe/donate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                token: token.id,
                amount: this.state.amount,
                account: account_id
            })
        })
        if (response.ok){
            console.log('Purchase Complete')
            this.setState({complete: true})
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name] : e.target.value })
    }    
    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>
        return (
            <div>
              <input
                type= 'text'
                name= "name"
                value = "name"
                onChange={this.changeHandler}
                placeholder= "Name"
                />
                $ <input
                type= 'text'
                name= "amount"
                value = "amount"
                onChange={this.changeHandler}
                placeholder= "Amount"
                />
              <CardElement />  
              <button onClick={this.handleSubmit}>Donate</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);