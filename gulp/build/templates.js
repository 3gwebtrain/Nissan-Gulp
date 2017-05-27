var templateCache = require('gulp-angular-templatecache');

module.exports = function( gulp, plugins ) {
	return function( ) {
		gulp.task('templates', function() {
			return gulp.src('./app/modules/**/*.tpl.html')
			.pipe(templateCache({
				root:'modules/',
				module: 'blog.templates',
				standalone: true
			}))
			.pipe(gulp.dest('./app/modules'));
		});
	}
}