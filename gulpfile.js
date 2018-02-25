var gulp         = require('gulp'),
    watch        = require('gulp-watch'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars      = require('postcss-simple-vars'),
    nested       = require('postcss-nested'),
    cssImport    = require('postcss-import'),
    browserSync  = require('browser-sync').create();


gulp.task('styles', function(){
  //Dictate which css file is our source
  return gulp.src('./app/assets/styles/styles.css')
    //Run the following filters
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    //Output the code to this folder
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function(){
  //initiates browserSync
  browserSync.init({
    //Hides notifications when page is updated
    notify: false,
    //Creates a local server
    server: {
      //Where we want our server to point to
      baseDir: "app"
    }
  });

  watch('./app/index.html', function(){
      //After any changes are made
      //to the html file, reload the server
      browserSync.reload();
  });
  watch('./app/assets/styles/**/*.css', function(){
    //After any changes are made to any css file
    //run the task cssInject
      gulp.start('cssInject');
  });
});

//Runs the dependencies task of "styles"
//before the cssInject task is run so we cssnano
//compile our stylesheet first
gulp.task('cssInject', ['styles'], function(){
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
