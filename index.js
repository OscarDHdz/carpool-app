// Init ------------------------------------------------------------------------
var express = require('express');
var knex = require('./server/KnexDB.js');
var bodyParser = require('body-parser');

var app = express();
const PORT = process.env.PORT || 3000;

// Middleware ------------------------------------------------------------------
app.use(bodyParser.json());
app.use(require('./server/middleware/enable-cors')(['GET', 'POST', 'PATCH', 'DELETE'], ['x-auth']));
app.use(require('./server/middleware/log'));


// Endpoints -------------------------------------------------------------------
var UserEndpoints = require('./server/endpoints/User');
app.use('/_api/v1', UserEndpoints);
var DestinyEndpoints = require('./server/endpoints/Destiny');
app.use('/_api/v1', DestinyEndpoints);

// AngularApp
app.use(express.static(__dirname + '/public'));


// Validate Dabatabase connection and Start API --------------------------------
knex.Validate()
.then(() => {
  app.listen(PORT, () => {
    console.log(`[36m%s[0m`, `# API Listening at: http://localhost:${PORT}`);
  });
})
