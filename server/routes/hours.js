var express = require('express');
var router = express.Router();
const knex = require('../knex/knex');


router.get('/hour', function(req,res,next) {
    knex.getAllHour(knex).then(results => res.send(results));
});
router.get('/hour/:min',function(req,res,next) {
    knex.getMin(req.params.min).then(results => res.send(results));
});
module.exports = router;