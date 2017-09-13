var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();

var {User, TABLE_NAME, ALLOWED_PARAMS} = require('../models/User');

router.get('/users', (req, res) => {
  knex(TABLE_NAME).select('*')
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
    knex(TABLE_NAME).select('*').where({id})
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
  var user = new User(data);


  if ( user.Validate() ) {
    delete user.id;

    knex(TABLE_NAME).insert(user).returning('*')
    .then((insertedData) => {
      if ( process.env.DB_CLIENT === 'sqlite3' ) return res.sendStatus(201);
      res.status(200).send(insertedData[0])
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
    knex(TABLE_NAME).update(data).where({id}).returning('*')
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

module.exports = router;
