export const MovieCard = ({ movie, onClick }) => {
  console.log('Movie Data in Card:', movie);  // Debugging log

  const imageUrl = movie.image || 'https://placekitten.com/200/300';
  const movieTitle = movie.title || 'Movie Title Not Available';
  const movieGenre = movie.genre || 'Genre Not Available';

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={imageUrl} alt={movieTitle} style={{ width: '200px' }} />
      <h3>{movieTitle}</h3>
      <p>{movieGenre}</p>
    </div>
  );
};
