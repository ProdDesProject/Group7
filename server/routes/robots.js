var express = require('express');
var router = express.Router();
const knex = require('../knex/knex');

router.get('/', function(req,res,next) {
    knex.getAllRobot(knex).then(results => res.send(results));
});
router.get('/:name',function(req,res,next) {
    knex.getRobot(req.params.name).then(results => res.send(results));
});
router.post('/', function(req,res,next) {
    knex.insertRobot(req.body).then(newRobot => res.send(newRobot[0]))
})
router.delete('/:idrobot' , function(req,res,next) {
    knex.deleteRobot(req.params.idrobot).then(function() { res.json({deleted:true})})
})
module.exports = router;