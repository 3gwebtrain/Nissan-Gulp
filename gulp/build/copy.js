module.exports = function( gulp,  plugin ) {
	return function( ){
		return gulp.task('copy', function() {
			gulp.src('./app/assets')
			.pipe(gulp.dest('./dist'));
		});
	}
}