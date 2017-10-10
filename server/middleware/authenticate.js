var {VerifyToken} = require('../utils/auth');


var authenticate = (req, res, next) => {

  var token = req.header('x-auth');
  if ( !token ) return res.status(403).send({message: 'Missing Authorization'})

  VerifyToken(token).then((payload) => {

    req.token = token;
    req.auth = payload;
    next();

  })
  .catch((err) => res.status(401).send(err))

}

var authenticateAdmin = (req, res, next) => {

  var token = req.header('x-auth');
  if ( !token ) return res.status(403).send({message: 'Missing Authorization'})

  VerifyToken(token).then((payload) => {

    req.token = token;
    req.auth = payload;
    if ( payload.data.user !== process.env.ADMIN_USER ) return res.status(403).send({message: 'No Permission'})
    next();

  })
  .catch((err) => res.status(401).send(err))

}

module.exports = {authenticate, authenticateAdmin}
