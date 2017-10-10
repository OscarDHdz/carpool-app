var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const argv = require('yargs').argv

const ENV = argv.environment || argv.env;

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "public/"
        },
        port: 8080
    });

     gulp.watch("public/**/**.**", ['reload']);
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('frontend', function () {

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
  console.log(`[36m%s[0m`, `Templating Frontend Resource Service for: ${ENV} environment`);
  var REST_URL = (ENV === 'dev') ? 'https://localhost:3000' : '';
  var {Template} = require('./public_templates/app/services/resouerce.service_template');



  console.log('Templated resource.service.js');

})


gulp.task('default', function () {
  console.log('Hello world!');
});
