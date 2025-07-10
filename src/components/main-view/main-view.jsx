import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';


export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movies = [
  {
    id: 1,
    title: 'Inception',
    description: 'A skilled thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    image: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg',
    genre: 'Sci‑Fi',
    director: 'Christopher Nolan'
  },
  {
    id: 2,
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    image: 'https://m.media-amazon.com/images/I/51vpnbwFHrL._AC_SY679_.jpg',
    genre: 'Action',
    director: 'Wachowski Sisters'
  },
  {
    id: 3,
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
    genre: 'Adventure',
    director: 'Christopher Nolan'
  }
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
