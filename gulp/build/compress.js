var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');

module.exports = function( gulp, plugins ) {
	return function( ) {
		gulp.task('compress', function() {
			return gulp.src('./app/index.html')
			.pipe(useref())
			.pipe(gulpif('*.js', uglify({ mangle: false })))
			.pipe(gulpif('*.css', minifyCss()))
			.pipe(gulp.dest('./dist'));
		});
	}
}