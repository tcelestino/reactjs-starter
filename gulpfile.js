var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')();

var css = {
  concat: require.('gulp-concat-css')
};

var SOURCE = {
  htmlPath: '*.html',
  vendorPath: 'src/js/vendor/**/*.js',
  jsPath: 'src/js/**/*.js',
  jsxPath: 'src/jsx/*',
  scssPath: 'src/scss/**/*.scss',
  cssPath: 'src/css/**/*.css'
};

var BUILD = {
  htmlPath: '.',
  jsPath: 'dist/js',
  cssPath: 'dist/css'
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

gulp.task('css-dev', function () {
  'use strict';
  var config = {
    includePaths: [
      require('node-bourbon').includePaths,
      require('node-neat').includePaths
    ]
  };

  return gulp.src(SOURCE.scssPath)
    .pipe(plugins.plumber())
    .pipe(plugins.sass(config))
    .pipe(css.concat('app.css'))
    .pipe(gulp.dest('src/css'))
});

gulp.task('dev', function () {
  'use strict';
  gulp.start('js-dev');
  gulp.start('css-dev');
});

gulp.task('watch-dev', function () {
  'use strict';
  var server = require('gulp-livereload');

  gulp.start('dev');
  server.listen();

  gulp.watch([SOURCE.jsxPath], ['js-dev']);
  gulp.watch([SOURCE.scssPath], ['css-dev']);

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
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify({
      wrap: true,
      mangle: {
        except: ['React', '$', '_', 'jQuery']
      }
    }))
    .pipe(gulp.dest(BUILD.js));
});

gulp.task('build-css', function () {
  'use strict';
  return gulp.src(SOURCE.cssPath)
    .pipe(plugins.sass())
    .pipe(css.concat('main.css'))
    .pipe(gulp.dest(BUILD.cssPath))
});

gulp.task('build', function () {
  gulp.start('build-js');
  gulp.start('build-html');
});

gulp.task('default', ['watch-dev']);