const bcrypt = require('bcryptjs');

var EncodePassword = ( password ) => {

  return new Promise((resolve, reject) => {

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err)  {
          console.log(err);
          reject(err);
        }
        resolve(hash);
      });
    });

  })

}

module.exports = { EncodePassword }
