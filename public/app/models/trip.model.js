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
    // if (typeof this.date === 'object') {
    //
    //   this.date = this.date.getUTCFullYear() + '-' + ('0' + (this.date.getUTCMonth() + 1)).slice(-2) + '-' + ( '0' + this.date.getDate()).slice(-2) + 'T00:00:00.000Z'
    //
    // }
    this.SetDataFormat()
  }

}

Trip.prototype.SetViewFormat = function () {
  this.date = new Date(this.date);
}
Trip.prototype.SetDataFormat = function () {
  if (typeof this.date === 'object') {
    this.date = this.date.getUTCFullYear() + '-' + ('0' + (this.date.getUTCMonth() + 1)).slice(-2) + '-' + ( '0' + this.date.getDate()).slice(-2) // + 'T00:00:00.000Z'
  }
  if ( typeof this.cost === 'string' ) this.cost = Number(this.cost);
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
