var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('../config/keys')
const nodemailer = require('nodemailer');


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
    .catch(error => {
      if(error.code == 11000){
        res.json({
          success:false,
          errorCode: error.code,
          errorMsg: email + " is already in use."
        })
      }
    })
    .catch(err => console.log(err))
  }))
})

router.post('/login', (req, res, next) =>{
  passport.authenticate('local', function(err, user, info) {
    if(err) throw err
    const token = jwt.sign(user.toJSON(), config.authSecret);
    return res.json({user, token});
  })(req, res, next);
})

router.post('/verify', (req, res, next) =>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'elmirnicolas@gmail.com',
           pass: 'Codeatbath1'
       }
})

const mailOptions = {
  name: "Nick",
  from: 'elmirnicolas@email.com', 
  to: req.body.email,
  subject: 'Hello Test', 
  html: '<p>Your html here</p>'
};

transporter.sendMail(mailOptions, function (err, info) {
  if(err)
    res.send(err)
  else
    res.send(info);
});

})

module.exports = router;
