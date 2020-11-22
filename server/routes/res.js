var express = require('express');
var router = express.Router();
const knex = require('../knex/knex');

router.get('/res', function(req,res,next) {
    knex.getAllReservation(knex).then(results => res.send(results));
});
router.get('/res/:idres',function(req,res,next) {
    knex.getReservationById(req.params.idres,req.body).then(results => res.send(results));
});
router.get('/res/:date?',function(req,res,next) {
    knex.getReservationByDate(req.params.date).then(results => res.send(results));
});
router.delete('/res/:idres',function(req,res,next) {
    knex.deleteReservation(req.params.idres).then(function() {res.json({deleted:true})});
});
router.post('/res', function(req,res,next) {
    knex.insertReservation(req.body).then(newRes => res.send(newRes[0]))
})
module.exports = router;