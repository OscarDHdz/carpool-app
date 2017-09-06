var _ = require('lodash');
const TABLE_NAME = 'destinies';
const ALLOWED_PARAMS = ['title'];

class Destiny {

  constructor( data ) {
    this.id = 0;
    this.title = '';

    if ( data ) {
      for (var key in data) {
        this[key] = data[key];
      }
    }

  }

  Validate( ) {

    if ( !_.isString(this.title) || this.title.length === 0) return false;

    return true;
  }

}

module.exports = {Destiny, TABLE_NAME, ALLOWED_PARAMS}
