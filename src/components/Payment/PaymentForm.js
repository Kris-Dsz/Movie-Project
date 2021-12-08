import React from "react";
import { CardElement} from "@stripe/react-stripe-js";
import { Link } from 'react-router-dom';
import "./stripe.styles.css";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#000",
			color: "#000000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#000000" },
			"::placeholder": { color: "#000000" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}

export default function PaymentForm() {
    return(
        <>
        <form> 
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <Link to={'/summary'} style={{ textDecoration: 'none' }} className='stripe-button'>
                            <span>Proceed to Summary</span>
            </Link>
            </form>
        </>
    )
}
        
       
    
