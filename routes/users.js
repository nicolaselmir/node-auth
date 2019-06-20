var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/all', function(req, res, next) {
  User.find()
  .then( user => {
    res.send(user);
  })
});

module.exports = router;
