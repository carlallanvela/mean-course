const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  // encrypt password
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: req.body.password
      });
      user.save()
        .then(result => {
          res.statusCode(201).json({
            message: 'User created!',
            result: result
          })
            .catch(err => {
              res.status(500).json({
                error: err
              })
            });
        });
    });
});

module.exports = router;
