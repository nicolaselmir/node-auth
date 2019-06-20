var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  User.find()
  .then(users => {
    res.send(users)
  })
});

router.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  
  const nenwUser = new User({
    name,
    email,
    password
  })
  
  bcrypt.genSalt(10, (err, salt) => bcrypt.hash(nenwUser.password, salt, (err, hash) => {
    if(err) throw err;
    nenwUser.password = hash
    nenwUser.save()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err))
  }))
})

router.post('/login', (req, res, next) =>{
  passport.authenticate('local', function(err, user, info) {
    if(err) throw err
    const token = jwt.sign(user.toJSON(), 'onemilliondollar');
    return res.json({user, token});
  })(req, res, next);
})

module.exports = router;
