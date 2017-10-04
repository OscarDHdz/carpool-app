var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();

var {User, TABLE_NAME, ALLOWED_PARAMS, PUBLIC_PARAMS} = require('../models/User');

router.use(require('../middleware/log'));

router.get('/users', (req, res) => {
  knex(TABLE_NAME).select(PUBLIC_PARAMS).where({active: true})
  .then((users) => {
    res.status(200).send({users})
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

router.get('/users/:id', (req, res) => {
  var id = req.params.id;
  if ( +id ) {
    knex(TABLE_NAME).select(PUBLIC_PARAMS).where({id})
    .then((respnse) => {
      if ( respnse[0] ) res.status(200).send(respnse[0])
      else res.status(404).send({message: 'Not Found'});
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }
  else {
    res.status(400).send({message: 'Invalid Id'})
  }
})

router.post('/users', (req, res) => {

  var data = _.pick(req.body, ALLOWED_PARAMS);
  var password = req.body.password;
  var passwordConf = req.body.passwordConf;

  if ( password !== passwordConf ) return res.status(401).send({message: 'Passwords don\'t match'})

  var user = new User(data);

  if ( !password ) return res.status(400).send({message: 'Bad Input Data'});
  if ( user.Validate()) {
    // Prepare for insert
    delete user.id;
    user.password = password
    user.token = '';

    // Continue to insert
    user.EncodePassword()
    .then((res) => knex(TABLE_NAME).insert(user).returning(PUBLIC_PARAMS))
    .then((insertedData) => {
      if ( process.env.DB_CLIENT === 'sqlite3' ) return res.status(200).send({id: insertedData[0]});
      return res.status(200).send(insertedData[0])
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({message: 'Existing email'});
    })

  }
  else return res.status(400).send({message: 'Bad Input Data'})


})

router.patch('/users/:id', (req, res) => {
  var id = req.params.id;
  var data = _.pick(req.body, ALLOWED_PARAMS);

  // Not allowed params
  delete data.id;
  delete data.email;

  if ( +id ) {
    knex(TABLE_NAME).update(data).where({id}).returning(PUBLIC_PARAMS)
    .then((updatedData) => {
      if ( process.env.DB_CLIENT === 'sqlite3' ) return res.sendStatus(201);
      if ( updatedData[0] ) res.status(200).send(updatedData[0])
      else res.status(404).send({message: ' Not Found'});
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }
  else {
    res.status(400).send({message: 'Invalid Id'})
  }
})

router.delete('/users/:id', (req, res) => {
    var id = req.params.id;

    if ( +id >= 0 ) {
      knex(TABLE_NAME).update({active: false}).where({id})
      .then((response) => {
        if ( !response ) {
          return res.status(404).send({message: 'User not found'})
        }
        else return res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      })
    }
    else {
      res.status(400).send({message: 'Invalid Id'})
    }
})

module.exports = router;
