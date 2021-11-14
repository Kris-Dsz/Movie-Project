import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './movie-detail.styles.css';


class MoviePage extends Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            isLoggedIn: 'false'
        }
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
    }

    bookWithoutLogin = () => {
        alert("You need to Sign-in/Register in order to book tickets...");
    }

    render() {
        console.log(this.state.movies[0]?.title);
        return(
            <div className='body'>
                <div className='collection-details-container'>
                    <div className='image-container'>
                        <img className='image' alt={this.state.movies[0]?.title} src={`${this.state.movies[0]?.poster}`} />
                    </div>
                    <div className='content'>
                        <h2>{this.state.movies[0]?.title}</h2>
                        <br/><br/><br/>
                        <p><span>Year of Release: </span>{this.state.movies[0]?.year}</p>
                        <p><span>Rated: </span>{this.state.movies[0]?.rated}</p>
                        <p><span>Genre: </span>{this.state.movies[0]?.genre}</p>
                        <p><span>Language: </span>{this.state.movies[0]?.language}</p>
                        <p><span>Country: </span>{this.state.movies[0]?.country}</p>
                        <p><span>Runtime: </span>{this.state.movies[0]?.runtime}</p>
                        <p><span>Cast: </span>{this.state.movies[0]?.cast}</p>
                        <p><span>Director: </span>{this.state.movies[0]?.director}</p>
                        <p><span>Writers: </span>{this.state.movies[0]?.writer}</p>
                        <p><span>Awards: </span>{this.state.movies[0]?.awards}</p>
                        <p><span>Plot: </span>{this.state.movies[0]?.plot}</p>
                        <p><span>IMDB: </span>{this.state.movies[0]?.ratings[0]?.value}</p>
                        <p><span>Rotten Tomatoes: </span>{this.state.movies[0]?.ratings[1]?.value}</p>
                        <p><span>Metacritic: </span>{this.state.movies[0]?.ratings[2]?.value}</p>
                        {
                    this.state.isLoggedIn==='true' ?
                    (
                        <Link to={`${this.props.match.url}/${this.state.movies[0]?.title.replace(/ /g, "+")}`}>
                            <div className='book-now'>
                                <p>BOOK TICKETS</p>
                            </div>
                        </Link>
                    )
                    :
                    (
                        <Link to='/signin' onClick={this.bookWithoutLogin}>
                            <div className='book-now'>
                                <p>BOOK TICKETS</p>
                            </div>
                        </Link>
                    )
                }
                    </div>
                </div>
                {/* {
                    this.state.isLoggedIn==='true' ?
                    (
                        <Link to={`${this.props.match.url}/${this.state.movies[0]?.title.replace(/ /g, "+")}`}>
                            <div className='book-now'>
                                <span>BOOK TICKETS</span>
                            </div>
                        </Link>
                    )
                    :
                    (
                        <Link to='/signin' onClick={this.bookWithoutLogin}>
                            <div className='book-now'>
                                <span>BOOK TICKETS</span>
                            </div>
                        </Link>
                    )
                } */}
            </div>
        );
    }
}

export default MoviePage;