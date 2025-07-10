import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';


export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movies = [
    { id: 1, title: 'Inception', description: '…', image: '…', genre: 'Sci‑Fi', director: 'Christopher Nolan' },
    { id: 2, title: 'The Matrix', description: '…', image: '…', genre: 'Action', director: 'Wachowski Sisters' },
    { id: 3, title: 'Interstellar', description: '…', image: '…', genre: 'Adventure', director: 'Christopher Nolan' },
  ];

  return selectedMovie ? (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  ) : (
    <div>
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} onClick={() => setSelectedMovie(m)} />
      ))}
    </div>
  );
};
