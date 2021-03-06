const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../knex/knex');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('../service/key');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function (username, password, done) {
    let user;
    if (username == null)
    {
      return done(null, false);
    }
    knex.getUserPass(username)
      .then((result) => {
        user = result;
        console.log(user);
        if (user == undefined) {
          // Username not found
          console.log("HTTP Basic username not found");
          return done(null, false, { message: "HTTP Basic username not found" });
        }

        /* Verify password match, note that the password here is in plaintext.
           DO NOT EVER STORE PASSWORDS in plaintexts */
        bcrypt.compare(password, user.password).then(bcryptResult => {
          if (bcryptResult == true) {
            done(null, user);
          }
          else {
            return done(null, false);
          }
        })
      })
  }
));


let options = {}

/* Configure the passport-jwt module to expect JWT
   in headers from Authorization field as Bearer token */
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

/* This is the secret signing key.
   You should NEVER store it in code  */
options.secretOrKey = jwtSecretKey.secret;

passport.use(new JwtStrategy(options, function (jwt_payload, done) {
  console.log("Processing JWT payload for token content:");
  console.log(jwt_payload);


  /* Here you could do some processing based on the JWT payload.
  For example check if the key is still valid based on expires property.
  */
  const now = Date.now() / 1000;
  if (jwt_payload.exp > now) {
    done(null, jwt_payload.user);
  }
  else // expired
  {
    done(null, false);
  }
}));


router.get(
  '/jwtProtectedResource',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log("jwt");
    res.json(
      {
        status: "Successfully accessed protected resource with JWT",
        user: req.user
      }
    );
  }
);

router.get(
  '/loginForJWT',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const body = {
      iduser: req.user.iduser,
      username: req.user.username
    };

    const payload = {
      user: body
    };

    const options = {
      expiresIn: '600s'
    }

    /* Sign the token with payload, key and options.
       Detailed documentation of the signing here:
       https://github.com/auth0/node-jsonwebtoken#readme */
    const token = jwt.sign(payload, jwtSecretKey.secret, options);

    return res.json({ token });
  })

module.exports = router;