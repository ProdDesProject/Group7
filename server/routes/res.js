var express = require('express');
var router = express.Router();
const knex = require('../knex/knex');

router.get('/', function(req,res,next) {
    knex.getAllReservation(knex).then(results => res.send(results));
});
router.get('/:idres',function(req,res,next) {
    knex.getReservationById(req.params.idres,req.body).then(results => res.send(results));
});
router.get('/:date',function(req,res,next) {
    knex.getReservationByDate(req.params.date).then(results => res.send(results));
});
router.delete('/:idres',function(req,res,next) {
    knex.deleteReservation(req.params.idres).then(function() {res.json({deleted:true})});
});
router.post('/', function(req,res,next) {
    knex.insertReservation(req.body).then(newRes => res.send(newRes[0]))
})
router.get('/res/:username',function(req,res,next) {
    knex.getReservationByName(req.params.username).then(function(data) {res.send(data)})
        
})

module.exports = router;