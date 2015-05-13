var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')();
var react     = require('gulp-react');

var SOURCE = {
  htmlPath: '*.html',
  vendorPath: 'src/js/vendor/**/*.js',
  jsPath: 'src/js/**/*.js'
};

var BUILD = {
  htmlPath: '.',
  jsPath: 'dist/js/',
};

/* DEV TASKS */

gulp.task('js-dev', function () {
  return gulp.src('src/js/jsx/App.jsx')
    .pipe(plugins.react())
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(gulp.dest('src/js'));
});


/* BUILD TASKS */
gulp.task('build-html', function () {
  'use strict';
  return gulp.src(SOURCE.htmlPath)
    .pipe(plugins.processhtml())
    .pipe(gulp.dest(BUILD.htmlPath));
});

gulp.task('default');