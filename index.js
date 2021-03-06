// Init ------------------------------------------------------------------------
var express = require('express');
var knex = require('./server/KnexDB.js');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
const PORT = process.env.PORT || 3000;

// Middleware ------------------------------------------------------------------
app.use(bodyParser.json());
app.use(require('./server/middleware/enable-cors')(['GET', 'POST', 'PATCH', 'DELETE'], ['x-auth']));



// Endpoints -------------------------------------------------------------------
var UserEndpoints = require('./server/endpoints/User');
app.use('/_api/v1', UserEndpoints);
var TripsEndpoints = require('./server/endpoints/Trip');
app.use('/_api/v1', TripsEndpoints);
var LoginEndpoints = require('./server/endpoints/Login');
app.use('/_api/v1', LoginEndpoints);

// AngularApp
app.use('/', express.static(path.join(__dirname, 'public')));

// Validate Dabatabase connection and Start API --------------------------------
knex.Validate()
.then(() => {
  app.listen(PORT, () => {
    console.log(`[36m%s[0m`, `# API Listening at: http://localhost:${PORT}`);
  });
})
