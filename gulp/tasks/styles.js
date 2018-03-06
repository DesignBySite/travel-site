var gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars      = require('postcss-simple-vars'),
    nested       = require('postcss-nested'),
    cssImport    = require('postcss-import'),
    mixins       = require('postcss-mixins'),
    hexrgba      = require('postcss-hexrgba');

gulp.task('styles', function(){
  //Dictate which css file is our source
  return gulp.src('./app/assets/styles/styles.css')
    //Run the following filters
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    //If an error occurs
    .on('error', function(errorInfo){
      //Print our the error message
      console.log(errorInfo.toString());
      //End the styles task
      this.emit('end');
    })
    //Output the code to this folder
    .pipe(gulp.dest('./app/temp/styles'));
});
