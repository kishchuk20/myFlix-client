const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Morgan to log requests to the terminal
app.use(morgan('dev'));

// Serve static files (like documentation.html) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// GET route for "/"
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movies.find(); // fetch all movies from MongoDB
    res.json(movies);
  }
   catch (error) {
    res.status(500).send('Error: ' + error);
  }
});

app.get('/movies/:title', async (req, res) => {
  try {
    const movie = await Movies.findOne({ Title: req.params.title });
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.json(movie);
  } catch (error) {
    res.status(500).send('Error: ' + error);
  }
});

app.get('/movies/genre/:genreName', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Genre.Name': req.params.genreName });
    res.json(movies);
  } catch (error) {
    res.status(500).send('Error: ' + error);
  }
});

app.post('/users', async (req, res) => {
 await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
// Get users by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

app.delete('/users/:username/movies/:movieID', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.username },
      { $pull: { FavoriteMovies: req.params.movieID } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('Error: ' + error);
  }
});

// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
  try {
    const user = await Users.findOneAndDelete({ Username: req.params.Username });

    if (!user) {
      return res.status(400).send(req.params.Username + ' was not found');
    }

    res.status(200).send(req.params.Username + ' was deleted.');
  } catch (err) {
    console.error('Error while deleting user:', err.message);
    res.status(500).send('Error: ' + err.message);
  }
});




// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Application error:', err.stack);
  res.status(500).send('Application error: ' + err.message);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});


app.use((err, req, res, next) => {
  console.error('Application error:', err);
  res.status(500).send('Something went wrong! Please try again later.');
});

// Serve static files (like documentation.html) from the 'public' folder — MOVE THIS DOWN
app.use(express.static(path.join(__dirname, 'public')));

