import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import "./booking.styles.css"
export default class Booking extends Component{

    constructor() {
        super();

        this.state = {
            screen: [],
            selectedSeats:[],
            timings: [],
            transaction_id: "",
            purchasedate: new Date(),
            movies: []
        }
    }

    SeatSelect=(e)=>{
        this.componentDidMount();
        console.log("within onclick "+parseInt(e.target.id)+typeof(parseInt(e.target.id)));
        if(e.target.classList.contains('unavailable')) return;
        if( this.state.selectedSeats.length===5 &&
            !e.target.classList.contains('selected')){
                console.log(this.state.selectedSeats);
                alert("Max number of seats per booking is 5");
                return;
            }
        e.target.classList.toggle('selected');
        if(this.state.selectedSeats.includes(parseInt(e.target.id))){
            this.setState({
                selectedSeats: this.state.selectedSeats.filter(val => val!==parseInt(e.target.id))
            })
            console.log(this.state.selectedSeats);      
        }
        else{
            this.state.selectedSeats.push(parseInt(e.target.id));
            console.log(this.state.selectedSeats); 
        }

    }

    onConfirm=()=>{
      //Creates Transaction
        fetch('http://localhost:3000/transaction/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                username: this.props.user.username,
                title: this.props.title,
                cinema: this.state.timings.cinema,
                time: this.state.timings.time,
                date: this.props.date.toLocaleDateString('en-CA').toString(),
                seatsBooked: this.state.selectedSeats,
                ticketPrice: this.state.timings.ticketPrice,
                cost: this.state.selectedSeats.length*this.state.timings.ticketPrice,
                purchasedate: this.state.purchasedate,
                poster: this.state.movies[0]?.poster

            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
              this.props.loadTransactionid(data._id);
              console.log("Transaction Id"+data._id);
            }
            else
                alert("Booking not Logged...");
        })
        .catch(err => console.log(err));

        //Modifies state variable for screen seats and updates it in fetch
        this.state.screen.reservedSeats?.push.apply(this.state.screen.reservedSeats,this.state.selectedSeats);
        console.log(this.state.screen.reservedSeats);
        fetch('http://localhost:3000/screen/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id: this.state.screen._id,
                seatsBooked: this.state.screen.reservedSeats
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
              // change data sending
                console.log(data);
            }
            else
                alert("Update not Logged...");
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        fetch('http://localhost:3000/screen/check', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id: this.props.timing_id,
                date: this.props.date
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data);
                this.setState({screen: data});
                console.log(this.state.screen);
            }
            else
                alert("Screens not logged");
        })
        .catch(err => console.log(err));
        fetch('http://localhost:3000/get_timing/byId', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id: this.props.timing_id
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data);
                this.setState({timings: data});
            }
            else
                alert("timing not logged");
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
              this.setState({movies: data});
              console.log(this.state.movies);
          }
          else
              alert("Screens not logged");
      })
      .catch(err => console.log(err));
    }

    render() {
          console.log(this.props.timing_id);
          console.log(this.props.date);          
        //  console.log(this.props.date.toLocaleDateString('en-CA').toString());
        //  console.log(this.props.user.username);
        //  console.log(this.props.title);
        //  console.log(this.state.selectedSeats.length)
        console.log("Timings from DB"+this.state.timings);
        console.log(this.state.screen.seats?.row0);
        console.log(this.state.screen.reservedSeats);
        // console.log(this.state.screen.reservedSeats?.includes(1)&&'unavailable');
         console.log(this.state.purchasedate.toLocaleDateString('en-CA').toString())
         console.log(this.state.timings.ticketPrice)
        return(
            <div className="parent-container">
              <div className="screen-container">
                        <div className="screen"/>
                </div> 
                <div className="theatre">
                  <div className="cinema_seats left">
                    <div className="cinema_row row_1">
                      {this.state.screen.seats?.row0.map((seatNumber) => {
                        return (
                          <div
                            key={seatNumber}
                            className={`seat ${
                              this.state.screen.reservedSeats?.includes(seatNumber) && 'unavailable'
                            }`}
                            id={seatNumber}
                            onClick={this.SeatSelect}
                          />
                        );
                      })}
                    </div>
         
                    <div className="cinema_row row_2">
                      {this.state.screen.seats?.row1.map((seatNumber) => {
                        return (
                          <div
                            key={seatNumber}
                            className={`seat ${
                                this.state.screen.reservedSeats.includes(seatNumber) && 'unavailable'
                            }`}
                            id={seatNumber}
                            onClick={this.SeatSelect}
                          />
                        );
                      })}
                    </div>
        
                    <div className="cinema_row row_3">
                      {this.state.screen.seats?.row2.map((seatNumber) => {
                        return (
                          <div
                            key={seatNumber}
                            className={`seat ${
                                this.state.screen.reservedSeats.includes(seatNumber) && 'unavailable'
                            }`}
                            id={seatNumber}
                            onClick={this.SeatSelect}                         
                          />
                        );
                      })}
                    </div>
        
                    <div className="cinema_row row_4">
                      {this.state.screen.seats?.row3.map((seatNumber) => {
                        return (
                          <div
                            key={seatNumber}
                            className={`seat ${
                                this.state.screen.reservedSeats.includes(seatNumber) && 'unavailable'
                            }`}
                            id={seatNumber}
                            onClick={this.SeatSelect}  
                           />
                        );
                      })}
                    </div>
        
                    <div className="cinema_row row_5">
                      {this.state.screen.seats?.row4.map((seatNumber) => {
                        return (
                          <div
                            key={seatNumber}
                            className={`seat ${
                                this.state.screen.reservedSeats.includes(seatNumber) && 'unavailable'
                            }`}
                            id={seatNumber}
                            onClick={this.SeatSelect}                           
                            />
                        );
                      })}
                    </div> 
                  </div>
                </div>
                <div className="seat-booking-summary">
                    <p><span>Movie: </span>{this.props.title}</p>
                    <p><span>SEAT BOOKING SUMMARY</span></p>
                    <p><span>No of Seats Booked : </span>{this.state.selectedSeats.length}</p>
                    <p><span>Booked Seats : </span>{this.state.selectedSeats.map((seatNumber) =>{
                        return (
                            <span>S-{seatNumber} </span>
                        )
                    })}</p>
                    <p><span>Total Price: ₹ </span>{this.state.selectedSeats.length*this.state.timings.ticketPrice}</p>                    
                    {this.state.selectedSeats.length? 
                    (<Link to={'/food'} style={{ textDecoration: 'none' }} onClick={this.onConfirm} className='confirm-booking'>
                        <div>
                            <span>Proceed to Food</span>
                        </div>
                    </Link> )
                    :
                    (
                      <div>
                            <span style={{textDecoration: 'underline', color: '#741212'}}>Please Select Your Seats</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

