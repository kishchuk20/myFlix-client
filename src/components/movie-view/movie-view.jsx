import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  const {
    title = 'Movie Title Not Available',
    description = 'Description Not Available',
    image = 'https://via.placeholder.com/300x450?text=No+Image+Available',
    genre = 'Genre Not Available',
    director = 'Director Not Available'
  } = movie || {};

  console.log('Movie object:', movie);
  console.log('Image URL:', image);

  return (
    <div className="movie-view">
      <img src={image} alt={title} style={{ width: '300px' }} />
      <h1>{title}</h1>
      <p>{description}</p>
      <p><strong>Genre:</strong> {genre}</p>
      <p><strong>Director:</strong> {director}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};



MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

