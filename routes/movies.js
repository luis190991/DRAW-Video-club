const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  response.send("estas en /movies/");
});

router.post('/', (request, response, next) => {
  response.send("estas en /movies/ -> post");
});

router.put('/', (request, response, next) => {
  response.send("estas en /movies/ -> put");
});

router.delete('/', (request, response, next) => {
  response.send("estas en /movies/ -> delete");
});

module.exports = router;
