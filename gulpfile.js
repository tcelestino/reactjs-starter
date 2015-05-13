var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')();

var SOURCE = {
  htmlPath: '*.html',
  vendorPath: 'src/js/vendor/**/*.js',
  jsPath: 'src/js/**/*.js',
  jsxPath: 'src/jsx/*'
};

var BUILD = {
  htmlPath: '.',
  jsPath: 'dist/js',
};

/* DEV TASKS */
gulp.task('js-dev', function () {
  'use strict';
  return gulp.src('src/jsx/*.jsx')
    .pipe(plugins.plumber())
    .pipe(plugins.react())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('dev', function () {
  'use strict';
  gulp.start('js-dev');
});

gulp.task('watch-dev', function () {
  'use strict';
  var server = require('gulp-livereload');

  gulp.start('dev');
  server.listen();

  gulp.watch([SOURCE.jsxPath], ['js-dev']);

});

/* BUILD TASKS */
gulp.task('build-html', function () {
  'use strict';
  return gulp.src(SOURCE.htmlPath)
    .pipe(plugins.processhtml())
    .pipe(gulp.dest(BUILD.htmlPath));
});

gulp.task('build-js', function () {
  'use strict';
  return gulp.src([
      SOURCE.vendorPath,
      SOURCE.jsPath
    ])
    .pipe(plugins.order([
      'src/js/vendor/*',
      'src/js/*'
    ]))
    .pipe(plugins.concat('App.js'))
    .pipe(plugins.uglify({
      wrap: true,
      mangle: {
        except: ['React', '$', '_', 'jQuery']
      }
    }))
    .pipe(gulp.dest(BUILD.js));
});

gulp.task('build', function () {
  gulp.start('build-js');
  gulp.start('build-html');
});

gulp.task('default', ['watch-dev']);