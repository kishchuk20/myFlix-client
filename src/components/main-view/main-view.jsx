import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';  // Import MovieCard
import { MovieView } from '../movie-view/movie-view';  // Import MovieView
import { LoginView } from "../login-view/login-view";


export const MainView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!user) return; // don't fetch movies if no user

    fetch('https://ki-movies-flix-dfd109e95cbd.herokuapp.com/movies')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, [user]);

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

  // Movie click handlers unchanged...

  return (
    <div>
      {!selectedMovie ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
          ))}
        </div>
      ) : (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      )}
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
};


