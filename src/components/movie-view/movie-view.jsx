export const MovieView = ({ movie, onBackClick }) => (
  <div>
    <button onClick={onBackClick}>Back</button>
    <h1>{movie.title}</h1>
    <img src={movie.image} alt={movie.title} style={{ width: '200px' }} />
    <p>{movie.description}</p>
    <p><strong>Genre:</strong> {movie.genre}</p>
    <p><strong>Director:</strong> {movie.director}</p>
  </div>
);