var gulp         = require('gulp'),
    watch        = require('gulp-watch'),
    browserSync  = require('browser-sync').create();

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
