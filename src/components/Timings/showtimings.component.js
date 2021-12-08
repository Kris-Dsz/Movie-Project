import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import './timings.styles.css';
import addDays from 'date-fns/addDays'

class ShowTimings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            timings: [],
            date: new Date()
        }
    }

    onTimingSelect = (_id)=>{
        console.log(_id);
        this.props.loadTimingid(_id);
        this.props.loadDate(this.state.date);
    }

    Timings = ({cinema,time,ticketPrice,_id}) => (
        <>
        <Link to={'/book'} style={{ textDecoration: 'none' }} onClick={()=>this.onTimingSelect(_id)}  className='timing-item'>
            <div className='timing-footer'>
                <span className='time'>{cinema} - </span>
                <span className='time'>{time}</span>
                <p/>
                <span className='time'>Price: ₹ {ticketPrice}</span>
            </div>
        </Link>
        <p/>
        </>
    )

    onChangeDate=(date)=>{
        this.setState({date: date });
        console.log(this.state.date);
    }

    componentDidMount(){
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
            }
            else
                alert("Movies not logged");
        })
        .catch(err => console.log(err));
        fetch('http://localhost:3000/get_timing', {
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
                this.setState({timings: data});
            }
            else
                alert("timing not logged");
        })
        .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.movies[0]?.title);
        console.log(this.state.date);
        return(
            <div className='timings-body'>
                <div className='timings-movie-details'>
                    <div className='timings-image-container'>
                        <img className='timings-image' alt={this.state.movies[0]?.title} src={`${this.state.movies[0]?.poster}`} />
                    </div>
                    <div className='timings-content'>
                        <h2>{this.state.movies[0]?.title}</h2>
                        <br/>
                        <p><span>Rated: </span>{this.state.movies[0]?.rated}</p>
                        <p><span>Language: </span>{this.state.movies[0]?.language}</p>
                        <p><span>Runtime: </span>{this.state.movies[0]?.runtime}</p>
                        <p><span>Choose Date: </span></p>
                        <div classname='date-select'>
                            <DatePicker
                                selected={this.state.date}
                                minDate={new Date()}
                                maxDate={addDays(new Date(), 5)}
                                onChange={chosen_Date => this.setState({date: chosen_Date})}
                            />
                        </div>
                        {/* format the timings below */}
                        <p><span>Choose Cinema and Timings: </span></p>
                        <div className='movie-timings'>
                            {this.state.timings.map(({cinema,time,ticketPrice,_id}) => this.Timings({cinema,time,ticketPrice,_id}))}      
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowTimings;