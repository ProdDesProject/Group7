var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const knex = require('../knex/knex');
const bcrypt = require('bcryptjs');
const saltRounds = 4;
/* GET users listing. */
const Users = () => knex('Users')
router.get('/', function (req, res, next) {
  knex.getAllUser(knex).then(results => res.send(results))
});
//GET user info
router.get('/username/:username', function (req, res, next) {
  knex.getUserInfo(req.params.username).then(results => res.send(results))
});
router.post('/login', function (req, res, next) {
  console.log(req.body)
  knex.insertUser(req.body).then(data => {
    res.send(data);
  })
});
// register
router.post('/register', (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  knex.getAllUser().then((result) => {
    let user = result.find(i => i.username === username);
    if (user === undefined) {
      if ((typeof username === "string") &&
        (username.length > 4) &&
        (typeof password === "string") &&
        (password.length > 6)) {
        bcrypt.hash(password, saltRounds).then(hash => {
          let newUser = {
            username: username,
            password: hash
          }
          console.log(newUser);
          knex.insertUser(newUser).then(data => {
            console.log(data);
          }).catch(
            console.log('error')
          )
        }
        )
          .then(dbResults => {
            console.log(dbResults);
            res.sendStatus(201);
          })
          .catch(error => res.sendStatus(500));
      }
      else {
        console.log("incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long");
        res.sendStatus(400);
      }
    }
    else {
      res.sendStatus(400);
    }
  })

});
module.exports = router;
