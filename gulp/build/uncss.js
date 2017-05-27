var uncss = require('gulp-uncss');

module.exports = function( gulp, plugin ) {
	return function( ) {
		return gulp.task('uncss', function() {
			gulp.src('./dist/css/style.min.css')
			.pipe(uncss({
				html: ['./app/index.html', './app/modules/**/*.tpl.html']
			}))
			.pipe(gulp.dest('./dist/css'));
		});
	}
}