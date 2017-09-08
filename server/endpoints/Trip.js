var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();

var {Trip, TABLE_NAME, ALLOWED_PARAMS} = require('../models/Trip');

router.get('/trips', (req, res) => {
  knex(TABLE_NAME).select('*')
  .then((trips) => {
    res.status(200).send({trips})
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

router.post('/trips', (req, res) => {

  var data = _.pick(req.body, ['users', 'date', 'cost', 'destiny']);

  // Validate users exietance
  knex.select('username').from('users').whereIn('id', data.users)
  .then((existingUsers) => {
    if ( existingUsers.length !== data.users.length ) return res.status(404).send({message: 'A user was not Found', foundUsers: existingUsers})

    // Validate Date/Cost/Destiny
    if ( !_.isNumber(data.destiny) || !_.isNumber(data.cost) ) return res.status(400).send({message: 'Bad Input Data'})



    var trips = [], promises = [];
    for (var i = 0; i < data.users.length; i++) {
      trips.push(new Trip({
        cost: data.cost,
        destiny: data.destiny,
        date: data.date,
        user_id: data.users[i]
      }))

      promises.push( knex(TABLE_NAME).insert(trips[i]).returning('*') )
    }

    return Promise.all(promises);

  })
  .then((insertedTrips) => {

    res.status(200).send(insertedTrips);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: err})
  })






})


router.get('/trips/:id', (req, res) => {
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


router.patch('/trips/:id', (req, res) => {
  var id = req.params.id;
  var data = _.pick(req.body, ALLOWED_PARAMS);

  // Not allowed params
  delete data.id;

  if ( +id ) {
    knex(TABLE_NAME).update(data).where({id}).returning('*')
    .then((updatedData) => {
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
