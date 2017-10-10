var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();
var {GenerateToken} = require('../utils/auth');
const bcrypt = require('bcryptjs');

const TABLE_NAME = 'auth';


router.use(require('../middleware/log'));

router.post('/login', (req, res) => {

  var cred = _.pick(req.body, ['user', 'password']);
  // var user = new User(cred);
  if ( !cred.user || !cred.password ) return res.status(400).send({message: 'Bad input Data'});

  knex(TABLE_NAME).select('*').where({auth: cred.user})
  .then((storedCred) => {
    if ( !storedCred[0] ) return false

    return bcrypt.compare(cred.password, storedCred[0].password);
  })
  .then((hashResponse) => {
    if ( hashResponse === false ) return res.status(404).send({message: 'Credential nor found'})
    // Gen Token!
    return GenerateToken(cred);
  })
  .then((token) => {
    return res.status(200).send({granted: true, token})  
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({message: err})
  })


})

module.exports = router;
