function User( data ) {

  this.id = -1;
  this.firstname = '';
  this.lastname = '';
  this.username = '';
  this.email = '';
  this.color = '';

  for (var key in data) {
    if ( Object.keys(this).indexOf(key) !== -1 ) this[key] = data[key];
  }

}

User.prototype.CopyFrom = function ( user ) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.username = user.username;
  this.email = user.email;
  this.color = user.color;
}

User.Copy = function ( userA, userB ) {
  userA.firstname = userB.firstname;
  userA.lastname = userB.lastname;
  userA.username = userB.username;
  userA.email = userB.email;
  userA.color = userB.color;
}
