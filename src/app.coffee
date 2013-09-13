fs = require 'fs'
express = require 'express'
app = express()

error = "Error 404: I haven't even seen that!"

movies = JSON.parse fs.readFileSync 'movies.json'

app.get '/movies', (req, res) ->
	res.json movies

app.get '/movies/random', (req, res) ->
	id = Math.floor Math.random() * movies.length
	movie = movies[id]
	res.json movie

app.get '/movies/:id', (req, res) ->
	if movies.length <= req.params.id or req.params.id <= 0
		res.statusCode = 404
		res.send error
	movie = movies[req.params.id]
	res.json movie

app.delete '/movies/:id', (req, res) ->
	if movies.length <= req.params.id or req.params.id <= 0
		res.statusCode = 404
		res.send error
	movies.splice req.params.id, 1
	res.json true

app.listen process.env.PORT || 4730