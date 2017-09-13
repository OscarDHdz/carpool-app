function User( data ) {

  this.firstname = '';
  this.lastname = '';
  this.username = '';
  this.email = '';
  this.color = '';

  for (var key in data) {
    this[key] = data[key];
  }

}
