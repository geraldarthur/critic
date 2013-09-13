#!/usr/bin/env node
var app, error, express, fs, movies;

fs = require('fs');
express = require('express');
app = express();

error = "Error 404: I haven't even seen that!";

movies = JSON.parse(fs.readFileSync('movies.json'));

app.get('/movies', function(req, res) {
  return res.json(movies);
});

app.get('/movies/random', function(req, res) {
  var id, movie;
  id = Math.floor(Math.random() * movies.length);
  movie = movies[id];
  return res.json(movie);
});

app.get('/movies/:id', function(req, res) {
  var movie;
  if (movies.length <= req.params.id || req.params.id <= 0) {
    res.statusCode = 404;
    res.send(error);
  }
  movie = movies[req.params.id];
  return res.json(movie);
});

app.delete('/movies/:id', function(req, res) {
  if (movies.length <= req.params.id || req.params.id <= 0) {
    res.statusCode = 404;
    res.send(error);
  }
  movies.splice(req.params.id, 1);
  return res.json(true);
});

app.listen(process.env.PORT || 4730);
