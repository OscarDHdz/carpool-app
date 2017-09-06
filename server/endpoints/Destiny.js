var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();

var {Destiny, TABLE_NAME, ALLOWED_PARAMS} = require('../models/Destiny');

router.get('/destiny', (req, res) => {
  knex(TABLE_NAME).select('*')
  .then((destinies) => {
    res.status(200).send({destinies})
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

router.get('/destiny/:id', (req, res) => {
  var id = req.params.id;
  if ( +id ) {
    knex(TABLE_NAME).select('*').where({id})
    .then((respnse) => {
      if ( respnse[0] ) res.status(200).send(respnse[0])
      else res.status(404).send({message: 'Todo Not Found'});
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }
  else {
    res.status(400).send({message: 'Invalid Id'})
  }
})

router.post('/destiny', (req, res) => {

  var data = _.pick(req.body, ALLOWED_PARAMS);
  var destiny = new Destiny(data);

  if ( destiny.Validate() ) {

    delete destiny.id;

    knex(TABLE_NAME).insert(destiny).returning('*')
    .then((insertedData) => {
      res.status(200).send(insertedData[0])
    })
    .catch((err) => res.status(500).status({error: err}))
  }
  else res.status(400).send({message: 'Bad Input Data'})



})

router.patch('/destiny/:id', (req, res) => {
  var id = req.params.id;
  var data = _.pick(req.body, ALLOWED_PARAMS);

  // Not allowed params
  delete data.id;

  if ( +id ) {
    knex(TABLE_NAME).update(data).where({id}).returning('*')
    .then((updatedData) => {
      if ( updatedData[0] ) res.status(200).send(updatedData[0])
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

module.exports = router;
