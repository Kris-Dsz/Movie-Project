import React from 'react';
import './movie-preview.styles.css';
import { Link } from 'react-router-dom';

const MoviePreview = ({title,poster}) => (
    <Link to={`/${title}`} className='collection-item'>
        <div className='image-container'>
            <img className='image' alt={title} src={`${poster}`} />
        </div>
        {
            (() => {
                    return(
                        <div className='collection-footer'>
                            <span className='title'>{title}</span>
                        </div>
                    );
                
            })()
        }
    </Link>
)

export default MoviePreview;