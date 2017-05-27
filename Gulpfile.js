var gulp = require('gulp');
var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');
var angularFilesort = require('gulp-angular-filesort');
var inject	= require("gulp-inject");
var bowerFiles = require('main-bower-files');
var plugins = require("gulp-load-plugins")( );


// Development web server
gulp.task('server', function() {
	connect.server({
		root: './app',
		port: 3000,
		livereload: true
	});
});

gulp.task('server-dist', function() {
	connect.server({
		root: './dist',
		port: 3000,
		livereload: true
	});
});

/*inejction process*/

gulp.task( "inject", function( ) {
	return gulp.src('./app/index.html')
	.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true }))
  	.pipe(inject(
  		gulp.src(['./app/modules/**/*.js'],{read: false}), {relative:true})
  	)
  	.pipe(inject(
  		gulp.src(['./app/stylesheets/**/*.css' ], {read: false}), {relative: true})
  	)
 	.pipe(gulp.dest('./app'));
});


gulp.task('templates', require('./gulp/build/templates')(gulp, plugins));
gulp.task('compress', require('./gulp/build/compress')(gulp, plugins));
gulp.task('copy', require('./gulp/build/copy')(gulp, plugins));
gulp.task('uncss', require('./gulp/build/uncss')(gulp, plugins));

gulp.task('watch', function( ) {
	gulp.watch(['./app/stylesheets/**/*.css' ], ["inject"]);
	gulp.watch(['./app/modules/**/*.js', './Gulpfile.js'], ['inject']);
});

gulp.task('default', ['server', 'inject', 'watch' ]);

gulp.task('build', ['templates', 'compress', 'copy','uncss']);
