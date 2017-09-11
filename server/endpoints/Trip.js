var express = require('express');
var knex = require('../KnexDB.js');
var _ = require('lodash');
var router = express.Router();
var moment = require('moment');

var {Trip, TABLE_NAME, ALLOWED_PARAMS} = require('../models/Trip');

var DESTINIES = ['Trabajo', 'Casa']

router.get('/trips', (req, res) => {

  $scope = { users: null, trips: null }

  // Get only trips from last month
  var todayDate = moment().format('YYYY-MM-DD');
  var monthAgoDate = moment().subtract(1, 'months').format('YYYY-MM-DD');

  knex(TABLE_NAME).select('*').where('date', '>=', monthAgoDate).andWhere('date', '<=', todayDate)
  .then((trips) => {
    $scope.trips = trips;
    return knex('users').select('*');
  })
  .then((users) => {
    res.status(200).send({trips: FormatTripsAndSetUsers($scope.trips, users)})
  })
  .catch((err) => {
    console.log(err);
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

      delete trips[i].id;

      promises.push( knex(TABLE_NAME).insert(trips[i]).returning('*') )
    }

    return Promise.all(promises);

  })
  .then((insertedTrips) => {

    var parsedTrips = [];

    for (var i = 0; i < insertedTrips.length; i++) {
      parsedTrips.push(insertedTrips[i][0]);
    }

    res.status(200).send(parsedTrips);
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

function FormatTripsAndSetUsers( trips, users ) {

  // Format Users by id
  var usersAsIdHash = {};
  for (var i = 0; i < users.length; i++) {
    usersAsIdHash[users[i].id] = users[i];
  }

  var formattedTrips = {};
  var tripDate, stringTripDate;
  for (var i = 0; i < trips.length; i++) {
    tripDate = trips[i].date;
    stringTripDate = tripDate.getUTCFullYear() + '-' + ('0' + (tripDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tripDate.getUTCDate()).slice(-2);
    // Set Tree Properties
    if ( !formattedTrips[stringTripDate] ) formattedTrips[stringTripDate] = {};
    if ( !formattedTrips[stringTripDate][DESTINIES[trips[i].destiny]]  ) formattedTrips[stringTripDate][DESTINIES[trips[i].destiny]]  = { cost: 0, travelers: [] };
    // Set Trip User
    trips[i].user = usersAsIdHash[trips[i].user_id]
    formattedTrips[stringTripDate][DESTINIES[trips[i].destiny]].travelers.push(trips[i]);
    formattedTrips[stringTripDate][DESTINIES[trips[i].destiny]].cost = trips[i].cost;
  }

  return formattedTrips;

}

module.exports = router;
