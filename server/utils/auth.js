const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

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

var GenerateToken = ( credential ) => {

  return new Promise((resolve, reject) => {
    var expirationDate = new Date();
    expirationDate.setHours( expirationDate.getHours() + 1 );
    var payload = {
      data: credential,
      type: 'auth',
      exp: expirationDate.getTime()
    }

    resolve(jwt.sign(payload, process.env.JWT_SECRET));

  })

}

var VerifyToken = ( token ) => {

  return new Promise((resolve, reject) => {

    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      var currentTime = new Date();
      if ( currentTime.getTime() > decoded.exp ) return reject({id: 'EXPIRED', message: 'Expired Token'})
      resolve(decoded);
    } catch (e) {
      reject({ id: 'INVALID', message: 'Invalid Token'})
    }

  })

}

module.exports = { EncodePassword, GenerateToken, VerifyToken }
