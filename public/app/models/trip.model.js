function Trip( data ) {

  this.id = -1;
  this.date = '';
  this.destiny = '';
  this.travelers = '';
  this.cost = '';

  for (var key in data) {
    if ( Object.keys(this).indexOf(key) !== -1 ) this[key] = data[key];
  }

}

Trip.prototype.CopyFrom = function ( trip ) {
  this.date = trip.date;
  this.destiny = trip.destiny;
  this.travelers = trip.travelers;
  this.cost = trip.cost;
}

Trip.Copy = function ( tripA, tripB ) {
  tripA.date = tripB.date;
  tripA.destiny = tripB.destiny;
  tripA.travelers = tripB.travelers;
  tripA.cost = tripB.cost;
}
