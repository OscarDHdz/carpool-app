var gulp = require('gulp');
var fs = require('fs');
const argv = require('yargs').argv

const ENV = argv.environment || argv.env;
const PORT = argv.port;


gulp.task('frontend', function (done) {

  if( !ENV ) {
    var error = 'Missing --environment/--env flag [prod|dev]';
    console.log(`[31m%s[0m`, error);
    throw error;
  }
  if ( ENV !== 'prod' &&  ENV !== 'dev' ) {
    var error = 'Flag --environment/--env can only take values: [prod|dev]';
    console.log(`[31m%s[0m`, error);
    throw error;
  }
  if( ENV === 'dev' && !PORT ) {
    var error = 'Missing --port flag [number]';
    console.log(`[31m%s[0m`, error);
    throw error;
  }

  console.log(`[36m%s[0m`, `Templating Frontend Resource Service for: ${ENV} environment`);
  if( PORT ) console.log(`[36m%s[0m`, `with port: ${PORT}`);

  // Template Resource Service
  var REST_URL = (ENV === 'dev') ? `http://localhost:${PORT}` : '';
  var {Template} = require('./public_templates/app/services/resource.service_template');


  WriteFilePromise(Template, {REST_URL}, "./public/app/services/resource.service.templated.js")
  .then((res) => {
    done(res);
  })
  .catch((err) => done(err) );


})

var WriteFilePromise = (TemplateFunction, bindings, output) => {

  return new Promise((resolve, reject) => {
    fs.writeFile(output, TemplateFunction(bindings), function(err) {
        if(err) {
            return reject(err)
        }
        resolve();
    });
  })

}


gulp.task('default', function () {
  console.log('Hello world!');
});
