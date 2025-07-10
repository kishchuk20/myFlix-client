
export const MovieCard = ({ movie, onClick }) => (
  <div
    onClick={onClick}
    style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '8px', margin: '8px' }}
  >
    <h3>{movie.title}</h3>
  </div>
);
