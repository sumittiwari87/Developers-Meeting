/** This gulp file is responsible to do all task related to compiling the sass and copying all the
*** resources into the dest folder to make the apllication running from ./dist folder
***/
var gulp = require("gulp"),
jshint = require('gulp-jshint'),
sassRuby = require('gulp-ruby-sass'),
sourcemaps = require('gulp-sourcemaps'),
sass = require('gulp-sass'),
webserver = require('gulp-webserver');

/*This task is responsible to copy all the resources into the ./dest folder*/
gulp.task('mv-resources',['mv-html','mv-images','mv-fonts','mv-js']);

gulp.task('mv-html',function(){
	gulp.src("front-end/src/*.html").pipe(gulp.dest("./front-end/dest"));
});

gulp.task('mv-images',function(){
	gulp.src("front-end/src/images/*.*").pipe(gulp.dest("./front-end/dest/images"));
});

gulp.task('mv-fonts',function(){
  /** font - awesome - library ***/
  gulp.src("front-end/src/fonts/awesome/css/*.min.css").pipe(gulp.dest("./front-end//dest/css"));
  gulp.src("front-end/src/fonts/awesome/fonts/*.*").pipe(gulp.dest("./front-end/dest/fonts"));
});

gulp.task('mv-js',function(){
	gulp.src("src/js/*.*").pipe(gulp.dest("./front-end/dest/js"));
});
/*The end of the block for task is responsible to copy all the resources into the ./dest folder*/

/**This task is to create build the sass file into css file */
gulp.task('sass', function () {
  return gulp.src('front-end/src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./front-end/dest/css/'));
});
/**This task is to create build the sass file into css file */

/**Task to find any error in the javascript files
***In future after including angular this is going
***to be a part of looking all the js files for different modules*/
gulp.task('jshint', function() {
  return gulp.src('front-end/src/js/**/*.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

/*This task use to build the sass file into css file using ruby gem sass.
**Ruby should install in your machine before using this script
**currently I am not using this in the current build */
gulp.task('sass-ruby', function () {
    return sass('front-end/src/scss/style.scss', {
      sourcemap: true,
      style: 'expanded'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./front-end/dest/css/'));
});

/*to watch the changes in the directory specified in the task*/
gulp.task('watch', function() {
  gulp.watch('front-end/src/js/**/*', ['jshint']);
  gulp.watch(['front-end/src/scss/**/*'], ['sass']);
  gulp.watch(['front-end/src/js/**/*.*'], ['mv-js']);
  gulp.watch(['front-end/src/*.html'], ['mv-html']);
});

/*to watch the changes in the directory and refresh the server. Currently this task is not working , but 
**in future I am going to corporate this*/
gulp.task('webserver', function() {
    gulp.src('./dest')
        .pipe(webserver({
          host:process.env.IP,
          port:process.env.PORT,
          livereload: {
            port: 8082,
            enable: true,
            directoryListing: true,
            open: true
            
          }
          
        }));
});

/**The default task , to run the app write in console in the same directory 'gulp'
***It will fire the default task */

gulp.task('default', ['watch', 'mv-resources','sass','webserver']);
