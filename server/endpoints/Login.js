var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var {User, TABLE_NAME, ALLOWED_PARAMS} = require('../models/User');

router.post('/login', (req, res) => {

  var cred = _.pick(req.body, ['username', 'password']);
  var user = new User(data);







})

module.exports = router;
