require('dotenv').config();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.CONNECTION_URI);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve images from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Then your routes
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});
app.get('/movies', async (req, res) => {
  Movies.find()
    .then((movies) => res.status(200).json(movies))
    .catch((error) => res.status(500).send('Error: ' + error));
});




app.get('/movies/:title', async (req, res) => {
  try {
    const movie = await Movies.findOne({ Title: req.params.title });
    if (!movie) return res.status(404).send('Movie not found');
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).send('Error: ' + error);
  }
});

app.get('/movies/genre/:genreName', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Genre.Name': req.params.genreName });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send('Error: ' + error);
  }
});

app.post('/movies', async (req, res) => {
  const { Title, Description, ImagePath, Genre, Director } = req.body;

  const newMovie = new Movies({
    Title,
    Description,
    ImagePath,
    Genre,
    Director
  });

  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});


app.post('/users', [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) return res.status(400).send(req.body.Username + ' already exists');
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
        .then((user) => res.status(201).json(user))
        .catch((error) => res.status(500).send('Error: ' + error));
    })
    .catch((error) => res.status(500).send('Error: ' + error));
});

app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).send('Error: ' + err));
});

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).send('Error: ' + err));
});

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) {
    return res.status(401).send('Permission denied');
  }
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((err) => res.status(500).send('Error: ' + err));
});

app.delete('/users/:Username/movies/:movieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) {
    return res.status(401).send('Permission denied');
  }
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.movieID } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send('User not found');
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send('Error: ' + error);
  }
});

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) {
    return res.status(401).send('Permission denied');
  }
  try {
    const user = await Users.findOneAndDelete({ Username: req.params.Username });
    if (!user) return res.status(400).send(req.params.Username + ' was not found');
    res.status(200).send(req.params.Username + ' was deleted.');
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }

  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: Users.hashPassword(req.body.Password),
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }
  )
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((err) => res.status(500).send('Error: ' + err));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Application error:', err.stack);
  res.status(500).send('Application error: ' + err.message);
});

const path = require('path');

// Serve React frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('Listening on Port ' + PORT);
});
