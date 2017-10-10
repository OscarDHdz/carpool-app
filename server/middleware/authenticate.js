var {VerifyToken} = require('../utils/auth');


var authenticate = (req, res, next) => {

  var token = req.header('x-auth');

  VerifyToken(token).then((payload) => {

    req.token = token;
    req.auth = payload;
    next();

  })
  .catch((err) => res.status(401).send(err))

}
