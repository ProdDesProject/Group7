var express = require('express');
var router = express.Router();
const knex = require('../knex/knex');

router.get('/robot', function(req,res,next) {
    knex.getAllRobot(knex).then(results => res.send(results));
});
router.get('/robot/:name',function(req,res,next) {
    knex.getRobot(req.params.name).then(results => res.send(results));
});
router.post('/robot', function(req,res,next) {
    knex.insertRobot(req.body).then(newRobot => res.send(newRobot[0]))
})
router.delete('/robot/:idrobot' , function(req,res,next) {
    knex.deleteRobot(req.params.idrobot).then(function() { res.json({deleted:true})})
})
module.exports = router;