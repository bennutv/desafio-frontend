var gulp = require("gulp"),
 		sass = require("gulp-sass"),
 		sourcemaps = require('gulp-sourcemaps'),
 		cleanCSS = require('gulp-clean-css'),
 		rename = require('gulp-rename'),
 		autoprefixer = require('gulp-autoprefixer'),
    inject = require('gulp-inject');

// SASS
var input = './sass/**/*.scss',
		output = './public/assets/css';

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

// INJECT
var publicSrc = [
	'public/**/*.js',
  'public/**/*.*.js'
];

gulp.task('inject', function () {
	var target = gulp.src('public/index.html');
	var sources = gulp.src(publicSrc, {read: false});

	return target.pipe(inject(sources, { ignorePath: 'public', addRootSlash: false }))
		.pipe(gulp.dest('./public'));
});

gulp.task('sass', function () {
	return gulp
		.src(input)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer())
		.pipe(gulp.dest(output));
});

gulp.task('minifyAndRename', function() {
	return gulp
		.src(output + '/main.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
  	.pipe(rename("main.min.css"))
		.pipe(gulp.dest(output));
})

gulp.task('watchSass', function() {
	return gulp
		.watch(input, ['sass', 'minifyAndRename'])
		.on('change', function(event) {
		  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('watchInject', function() {
  return gulp
    .watch(publicSrc, ['inject'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'minifyAndRename', 'inject', 'watchSass', 'watchInject']);
