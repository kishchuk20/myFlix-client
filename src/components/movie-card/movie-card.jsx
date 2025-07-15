export const MovieCard = ({ movie, onClick }) => {
  if (!movie) return null; 

  const imageUrl = movie.ImagePath || 'https://placekitten.com/200/300';
  const movieTitle = movie.Title || 'Movie Title Not Available';
  const movieGenre = movie.Genre?.Name || 'Genre Not Available';

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={imageUrl} alt={movieTitle} style={{ width: '200px' }} />
      <h3>{movieTitle}</h3>
      <p>{movieGenre}</p>
    </div>
  );
};
