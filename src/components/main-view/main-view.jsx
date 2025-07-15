import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';  // Import MovieCard
import { MovieView } from '../movie-view/movie-view';  // Import MovieView

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies from the API
  useEffect(() => {
    fetch('http://localhost:1234/movies')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Movies:', data);  // Log the API response
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
            <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
          ))}
        </div>
      ) : (
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

