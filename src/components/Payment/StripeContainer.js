import React,{Component} from "react";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import "./stripe.styles.css";
import "./paymentform.styles.css"
import PaymentForm from "./PaymentForm"
const PUBLIC_KEY ="pk_test_51JwKNAEqw6B1K2J0b3AVEPc4t26pXln095dVISbGf9XFKxSKWFEywD95WIeY9E2d7ag7fwOgqiMnOn9BKtpo3gLe00lGcpd3gk"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default class StripeContainer extends Component {
    
    constructor() {
        super();

        this.state = {
            transaction: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/transaction/id', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id: this.props.transaction_id
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data);
                this.setState({transaction: data});
                console.log(this.state.transaction);
            }
            else
                alert("Screens not logged");
        })
        .catch(err => console.log(err));
    }
    render(){
        console.log(this.state.transaction?.cost)
    return(
    <div className='payment-form-container'>
        <div className='FormWrap'>
            <div className='FormContent'>    
            <form className='form'>
                <h1>PAYMENT </h1>
                <label>Full Name</label>
                <input type="text" id="name" defaultValue={this.props.user.name}  required />
                <label>Phone Number</label>
                <input type="text" id="phone" defaultValue={this.props.user.phone} required />
                <label>Email</label>
                <input id="email" defaultValue={this.props.user.email} type="email" /> 
                <label style={{color:"#750000",fontSize:"25px",fontWeight:"bold"}}>Payment Amount: ₹{this.state.transaction?.cost}</label>
                <label>Enter Card Details</label> 
                <Elements stripe={stripeTestPromise}>
                    <PaymentForm />
                </Elements>
            </form>
            </div>
        </div>
    </div>
    )
    }
}