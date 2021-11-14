import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import MoviePreview from './Movies/Moviepreview.component';
import "./movie-preview.styles.css"

export default class HomePage extends Component {
 constructor(props){
     super(props);
     this.state={
        movies: []
     };
    }
    
    SelectTitle = (title)=>{
        console.log("called "+title);
        this.props.loadTitle(title);
    }
    
    MoviePreview = ({title,poster}) => (
        <Link to={'/movie'} onClick={()=> this.SelectTitle(title)} className='collection-item'>
            <div className='image-container'>
                <img className='image' alt={title} src={`${poster}`} />
            </div>
            <div className='collection-footer'>
                                <span className='title'>{title}</span>
                            </div>
        </Link>
    )
    componentDidMount(){
        this.props.loadTitle("");
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
        console.log(this.state.movies[0]);
        console.log(this.props.user);
        return (
            <div className='body'>
                {this.state.movies.map(({title,poster}) => this.MoviePreview({title,poster}))}
                {/* {this.state.movies.map(({title,...otherCollectionProps}) =><MoviePreview key={title} title={title} {...otherCollectionProps} />)} */}
            </div>
        )
    }
}
