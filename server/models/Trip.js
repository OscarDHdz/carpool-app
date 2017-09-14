var _ = require('lodash');
const TABLE_NAME = 'trips';
const ALLOWED_PARAMS = ['users', 'destiny', 'cost',  'date'];

class Trip {

  constructor( data ) {
    this.id = 0;
    this.users = [];
    this.destiny = '';
    this.cost = 0;
    this.date = new Date();

    if ( data ) {
      for (var key in data) {
        this[key] = data[key];
      }
    }

  }

  Validate( ) {

    if ( !_.isArray(this.users) ) return false;
    if ( !_.isString(this.destiny) ) return false;
    if ( !_.isNumber(this.cost) ) return false;
    return true;
  }

}

module.exports = {Trip, TABLE_NAME, ALLOWED_PARAMS}
