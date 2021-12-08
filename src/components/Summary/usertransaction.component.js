import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './userTransaction.styles.css';
export default class UserTransaction extends Component{

    constructor() {
        super();

        this.state = {
            transaction: [],
            movie: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/transaction/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                username: this.props.user.username
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
        fetch('http://localhost:3000/get_movie', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(data => {
          if(data){
              console.log(data);
              this.setState({movies: data});
          }
          else
              alert("Movies not logged");
      })
      .catch(err => console.log(err));
    }

    render() {
        console.log("User Name"+this.props.user.username);
        console.log("Transactions "+this.state.transaction[0]?.seatsBooked);

        // console.log("No of seats booked "+this.state.transaction?.seatsBooked?.length);
        // console.log("Cost "+this.state.transaction.cost);
        // console.log("Timing Id"+this.state.transaction?.timingId);
        // console.log("Movie Title"+this.state.transaction?.title); 
        return(
          <div className="transaction-main">
          <h1 className="transaction-history-heading">TRANSACTION HISTORY</h1>
          <div className="User-Transaction-Container">
              {this.state.transaction.map(({title,date,seatsBooked,cinema,time,cost,purchasedate,poster}) => 
                    <div className="Transaction-User">
                        <img className='transaction-movie-image' alt={title} src={`${poster}`} /> 
                        <h2 className="Transaction-details">{title}</h2>
                        <h4>Purchase Date: {new Date(purchasedate).toLocaleDateString('en-CA').toString()}</h4>                  
                        <p className="Transaction-details">
                          <strong>Venue: </strong>{cinema}
                          <br/>
                          <strong>When: </strong>{time} {date}
                          <br/>
                          <strong>Seats: </strong> {seatsBooked?.map((seat) => {
                                return <span key={seat}>S{seat} </span>;})}
                        </p>
                        <table class="transaction-breakdown">
                                    <tbody>
                                        <tr class="total">
                                            <td>Order Total</td>
                                            <td>₹ {cost}</td>
                                        </tr>
                                    </tbody>
                                </table>
                    </div>
                )
                }
            </div>
            <br/>
          </div>
        );
    }
}

