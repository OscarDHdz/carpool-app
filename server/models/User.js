var _ = require('lodash');
const TABLE_NAME = 'users';
const ALLOWED_PARAMS = ['username', 'firstname', 'lastname', 'color', 'email'];
const PUBLIC_PARAMS = ['id','username', 'firstname', 'lastname', 'color', 'email']

class User {

  constructor( data ) {
    this.id = 0;
    this.username = '';
    this.email = '';
    this.token = '';
    this.firstname = '';
    this.lastname = '';
    this.color = '';

    if ( data ) {
      for (var key in this) {
        this[key] = data[key];
      }
    }

  }

  Validate( ) {

    if ( !_.isString(this.username) || this.username.length === 0) return false;
    if ( !_.isString(this.firstname) || this.firstname.length === 0) return false;
    if ( !_.isString(this.lastname) || this.lastname.length === 0) return false
    if ( !_.isString(this.color) || this.color.length === 0) return false;
    if ( !_.isString(this.email) || this.email.length === 0) return false;

    return true;
  }


}


module.exports = {User, TABLE_NAME, ALLOWED_PARAMS, PUBLIC_PARAMS}
