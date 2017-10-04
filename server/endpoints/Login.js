var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var {User, TABLE_NAME, ALLOWED_PARAMS} = require('../models/User');
router.use(require('../middleware/log'));

router.post('/login', (req, res) => {

  var cred = _.pick(req.body, ['username', 'password']);
  // var user = new User(cred);

  if ( cred.username === 'admin' && cred.password === 'admin' )
    return res.status(200).send({message: 'Welcome'})
  else
    return res.sendStatus(403);




})

module.exports = router;
