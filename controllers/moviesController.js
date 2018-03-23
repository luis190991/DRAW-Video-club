const express = require('express');
const Movie = require('../models/movie');

function index(request, response, next) {
  const page = request.params.page ? request.params.page : 1;
  Movie.paginate({}, {
    page: page,
    limit: 3
  }, (err, objs) => {
    if (err) {
      response.json({
        error: true,
        message: 'no se pudo extraer los usuarios',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Lista de Peliculas',
        objs: objs
      });
    }
  });
}

function create(request, response, next) {
  const title = request.body.title;
  const genre = request.body.genre;
  const duration = request.body.duration;
  const director = request.body.director;

  let movie = new Movie();
  movie.title = title;
  movie.genre = genre;
  movie.duration = duration;
  movie.director = director;

  movie.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Pelicula no  Guardada',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Pelicula Guardada',
        objs: obj
      });
    }
  });
}

function update(request, response, next) {
  response.send("estas en /movies/ -> put");
}

function remove(request, response, next) {
  response.send("estas en /movies/ -> delete");
}

module.exports = {
  index,
  create,
  update,
  remove
};
