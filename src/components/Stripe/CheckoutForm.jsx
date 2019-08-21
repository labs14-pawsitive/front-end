import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';

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
    
        let { token } = await this.props.stripe.createToken({
            name: this.state.name,
        })


        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/stripe/donate`, {
                token: token.id,
                data: { 
                    amount: this.state.amount, 
                    shelter_id: this.props.match.params.id,
                    user_id: localStorage.getItem('user_id'),
                 } 
            })
            .then(res =>{ 
                console.log(res)
            })
            .catch(err => {
                console.log('Donate Error:', err)
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