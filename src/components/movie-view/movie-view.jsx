import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  const {
    Title: title = 'Movie Title Not Available',
    Description: description = 'Description Not Available',
    ImagePath: image = 'https://via.placeholder.com/300x450?text=No+Image+Available',
    Genre,
    Director
  } = movie;

  const genreName = Genre?.Name || 'Genre Not Available';
  const directorName = Director?.Name || 'Director Not Available';

  return (
    <div className="movie-view">
      <img src={image} alt={title} style={{ width: '300px' }} />
      <h1>{title}</h1>
      <p>{description}</p>
      <p><strong>Genre:</strong> {genreName}</p>
      <p><strong>Director:</strong> {directorName}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
