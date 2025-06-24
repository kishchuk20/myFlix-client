const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Use Morgan to log requests to the terminal
app.use(morgan('dev'));

// Serve static files (like documentation.html) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// GET route for "/"
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});

// GET route for "/movies" — returns JSON with top 10 movies
app.get('/movies', (req, res) => {
  const top20Movies = [
  { id: 1, title: 'Everything Everywhere All at Once', year: 2022 },
  { id: 2, title: 'The Batman', year: 2022 },
  { id: 3, title: 'Avatar: The Way of Water', year: 2022 },
  { id: 4, title: 'Black Panther: Wakanda Forever', year: 2022 },
  { id: 5, title: 'John Wick: Chapter 4', year: 2023 },
  { id: 6, title: 'Oppenheimer', year: 2023 },
  { id: 7, title: 'Dune: Part Two', year: 2023 },
  { id: 8, title: 'Mission: Impossible – Dead Reckoning Part One', year: 2023 },
  { id: 9, title: 'Killers of the Flower Moon', year: 2023 },
  { id: 10, title: 'The Marvels', year: 2025 },
  { id: 11, title: 'Spider-Man: Across the Spider-Verse', year: 2023 },
  { id: 12, title: 'Guardians of the Galaxy Vol. 3', year: 2023 },
  { id: 13, title: 'Barbie', year: 2023 },
  { id: 14, title: 'Wonka', year: 2023 },
  { id: 15, title: 'The Little Mermaid', year: 2023 },
  { id: 16, title: 'Indiana Jones and the Dial of Destiny', year: 2023 },
  { id: 17, title: 'The Hunger Games: The Ballad of Songbirds & Snakes', year: 2023 },
  { id: 18, title: 'The Bikeriders', year: 2024 },
  { id: 19, title: 'Napoleon', year: 2023 },
  { id: 20, title: 'Mission: Impossible – Dead Reckoning Part Two', year: 2024 }
];

  res.json(top20Movies);
});

app.get('/movies/:title', (req, res) => {
  res.send(`GET movie by title: ${req.params.title}`);
});

app.get('/movies/type/:tpeName', (req, res) => {
  res.send(`GET movies by type: ${req.params.genreName}`);
});

app.post('/users', (req, res) => {
  res.send('POST new user');
});

app.get('/users', (req, res) => {
  res.send('GET all users');
});

app.put('/users/:username', (req, res) => {
  res.send(`PUT update user: ${req.params.username}`);
});

app.post('/users/:username/movies/:movieID', (req, res) => {
  res.send(`POST add movie ${req.params.movieID} to user ${req.params.username}`);
});

app.delete('/users/:username/movies/:movieID', (req, res) => {
  res.send(`DELETE movie ${req.params.movieID} from user ${req.params.username}`);
});

app.delete('/users/:username', (req, res) => {
  res.send(`DELETE user: ${req.params.username}`);
});
// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Application error:', err);
  res.status(500).send('Something went wrong! Please try again later.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


