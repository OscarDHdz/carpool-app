var _ = require('lodash');
const TABLE_NAME = 'trips';
const ALLOWED_PARAMS = ['user_id', 'destiny', 'cost', 'payed', 'date'];

class Trip {

  constructor( data ) {
    this.id = 0;
    this.user_id = -1;
    this.destiny = -1;
    this.cost = 0;
    this.payed = false;
    this.date = new Date();

    if ( data ) {
      for (var key in data) {
        this[key] = data[key];
      }
    }

  }

  Validate( ) {

    if ( !_.isNumber(this.user_id) ) return false;
    if ( !_.isNumber(this.destiny) ) return false;
    if ( !_.isNumber(this.cost) ) return false;
    if ( !_.isBoolean(this.payed) ) return false;

    return true;
  }

}

module.exports = {Trip, TABLE_NAME, ALLOWED_PARAMS}
