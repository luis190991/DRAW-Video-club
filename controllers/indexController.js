const express = require('express');
const User = require('../models/user');
const async = require('async');
const bcrypt = require('bcrypt');


function index(request, response, next) {

};

function login(request, response, next) {
  console.log("fwrsfrewfefc");
  const email = request.body.email;
  const password = request.body.password;
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
          response.json({
            error: false,
            message: 'Usuario y password ok',
            objs: {}
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
  login
};
