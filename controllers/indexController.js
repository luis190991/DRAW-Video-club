const express = require('express');
const User = require('../models/user');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


function index(request, response, next) {
  response.render('index', {});
};

function logout(request, response, next) {
  response.render('logout', {});
};

function login(request, response, next) {
  const email = request.body.email;
  const password = request.body.password;
  const key = config.get('api.key');
  console.log(key);
  async.parallel({
    user: (callback) => {
      User.findOne({
        email: email
      }).exec(callback);
    }
  }, (err, results) => {
    const user = results.user;
    if (user) {
      bcrypt.hash(password, user.salt, function(err, hash) {
        if (hash === user.password) {
          const payload = {
            id: user._id
          };
          let token = jwt.sign(payload, key, {
            expiresIn: 86400
          });
          response.json({
            error: false,
            message: 'Usuario y password ok',
            objs: {
              token: token
            }
          });
        } else {
          response.json({
            error: true,
            message: 'Usuario y password incorrectos',
            objs: {}
          });
        }
      });
    } else {
      response.json({
        error: true,
        message: 'Usuario y password incorrectos',
        objs: {}
      });
    }
  });
};



module.exports = {
  index,
  login,
  logout
};
