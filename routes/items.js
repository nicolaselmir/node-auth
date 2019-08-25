var express = require('express');
var router = express.Router();
const Item = require('../models/items');

router.get('/', function(req, res, next) {
    Item.find()
    .then(Response => {
        res.send(Response);
    })
});

router.get('/l/:limit', function(req, res, next) {
    Item.paginate({}, { page:1, limit:parseInt(req.params.limit) })
    .then(Response => {
        res.send(Response);
    })
});

router.get('/page/:page/limit/:limit', function(req, res, next) {
    Item.paginate({}, { page:req.params.page, limit:parseInt(req.params.limit) })
    .then(Response => {
        res.send(Response);
    })
});

router.post('/', (req, res, next) => {
    Item.create({ name: req.body.name, description:req.body.description } ,function (err, small) {
        if (err) return handleError(err);
        res.send(small);
      });
})

module.exports = router;
