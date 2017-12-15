var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./js/**/*.js']
};


gulp.task('sass', function(done) {
    gulp.src('./scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./dist/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function(done) {
    gulp.src('./js/app.js')
        .pipe(gulp.dest('./dist/js/'))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
                }
            }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('all', ['sass', 'js'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});
