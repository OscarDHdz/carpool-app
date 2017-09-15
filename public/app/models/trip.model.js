function Trip( data ) {

  this.id = -1;
  this.date = new Date();
  this.date.setHours(0,0,0,0);
  this.destiny = '';
  this.users = [];
  this.users_obj = [];
  this.cost = '';

  for (var key in data) {
    if ( Object.keys(this).indexOf(key) !== -1 ) this[key] = data[key];
  }

}

Trip.prototype.CopyFrom = function ( trip ) {
  this.date = trip.date;
  this.destiny = trip.destiny;
  this.users = trip.users;
  this.users_obj = trip.users_obj;
  this.cost = trip.cost;
}

Trip.Copy = function ( tripA, tripB ) {
  tripA.date = tripB.date;
  tripA.destiny = tripB.destiny;
  tripA.users = tripB.users;
  tripA.users_obj = tripB.users_obj;
  tripA.cost = tripB.cost;
}
