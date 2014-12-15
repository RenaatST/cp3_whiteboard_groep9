var gulp 		= require('gulp');
var gutil 		= require('gulp-util');
var browserify  = require('browserify');
var source 		= require('vinyl-source-stream');
var jshint 		= require('gulp-jshint');
var stylish 	= require('jshint-stylish');
var uglify 		= require('gulp-uglify');
var buffer 		= require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');



gulp.task('default', ['lint', 'browserify'], function(){
	var watcher = gulp.watch('./js/src/**/*.js', ['browserify']); 
});

gulp.task('lint', function() {
  return gulp.src('js/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('browserify', ['lint', 'compress'], function(){ 
	var bundler = browserify({
		entries: ['./js/src/script.js']	 
	});

	return bundler.bundle() 
		.on('error', function(err) { 
			gutil.beep();
			console.log(err.message); 
			this.emit('end');
			
		})
		.pipe(source('script.dist.js')) 
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./js'));
});


gulp.task('compress', function() {

  gulp.src('js/script.dist.js')
    //.pipe(uglify())
    .pipe(gulp.dest('dist'))
});


