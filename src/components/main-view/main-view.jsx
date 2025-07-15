import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';  // Import MovieCard
import { MovieView } from '../movie-view/movie-view';  // Import MovieView

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies from the API
  useEffect(() => {
  fetch('https://ki-movies-flix-dfd109e95cbd.herokuapp.com/movies')

    .then((response) => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched Movies:', data);
      setMovies(data);
    })
    .catch((error) => console.error('Error fetching movies:', error));
}, []);


  // Handle movie click
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      {!selectedMovie ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onClick={() => handleMovieClick(movie)} />
          ))}
        </div>
      ) : (
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

