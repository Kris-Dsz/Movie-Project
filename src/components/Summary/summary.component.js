import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './movie_ticket.styles.css';
export default class Summary extends Component{

    constructor() {
        super();

        this.state = {
            movie: [],
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
        fetch('http://localhost:3000/movie', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                title: this.props.title
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data);
                this.setState({movie: data});
            }
            else
                alert("timing not logged");
        })
        .catch(err => console.log(err));
    }

    render() {
        console.log("Transaction Id "+this.props.transaction_id);
        console.log("Timing Id "+this.props.timing_id);
        console.log("Movie Title "+this.props.title);
        console.log("User Name"+this.props.user.name);
        console.log("Movie Title "+this.state.movie[0]?.title);
        //console.log("Cinema "+this.state.timings.cinema);
        console.log("Date "+this.state.transaction?.date);
        console.log("No of seats booked "+this.state.transaction?.seatsBooked?.length);
        console.log("Cost "+this.state.transaction.cost);
        // console.log("Timing Id"+this.state.transaction?.timingId);
        // console.log("Movie Title"+this.state.transaction?.title); 
        return(
          <div className="booking-body">
          <h1 className="booking-heading">BOOKING SUMMARY</h1>
          <div className="booking-movie-ticket">
                <div className="booking-cardWrap">
                  <div className= "booking-card"> 
                    <div className="booking-cardLeft">
                    <h2 style={{textAlign:'center',fontWeight:'bold'}}>TICKET</h2>
                      <div className="booking-title">
                        <h2>{this.state.movie[0]?.title}</h2>
                        <span>Movie</span>
                      </div>
                      <div className="booking-name">
                        <h2>{this.props.user.name}</h2>
                        <span>Name</span>
                      </div>
                      <div className="booking-date">
                        <h2>{this.state.transaction?.date}</h2>
                        <span>Date</span>
                      </div>
                      <div className="booking-time">
                        <h2>{this.state.transaction?.time}</h2>
                        <span>Time</span>
                      </div>
                      <div className="booking-seat">
                        <div className="booking-seats">
                          {this.state.transaction?.seatsBooked?.map((seat) => {
                            return <h2 key={seat}>S{seat}</h2>;
                          })}
                        </div>
                        <span>Seats</span>
                      </div>
                      <br/><br/><br/>
                      <div className="booking-food">
                          {this.state.transaction?.food?.map(({name,count}) => 
                                    <>
                                        <div className="booking-food-item">
                                          <h2>{name} - {count} </h2>
                                          <span>Food</span>
                                        </div>
                                    </>
                              )}
                        </div>
                        <br/>
                        <div className="booking-screen">
                          <h2>{this.state.transaction?.cinema}</h2>
                          <span>Theatre</span>
                        </div>
                        <p/>
                        <div className="booking-price">
                          <h2>₹ {this.state.transaction.cost} </h2>
                          <span>Total</span>
                        </div>
                        <div className="booking-barcode" />
                        <h2 style={{fontSize: "0.7em",color: "white",textAlign:"center",paddingTop:"10px",fontWeight:'bold'}}>BARCODE</h2>
                        
                    </div>
                </div>                
                </div>
            </div>
            <div className="return-home">
                <Link to={'/home'} style={{ textDecoration: 'none' }} className='proceed-movie-home'>
                        <div>
                            <span> Proceed To Movie Home Page</span>
                        </div>
                    </Link>  
            </div>
            </div> 
        );
    }
}

