var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res, next) {
  User.find()
  .then( user => {
    res.send(user);
  })
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) throw error;
    res.send(user);
  })
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) throw error;
    user.remove()
    .then(res.send('User deleted'));
  })
})

module.exports = router;
