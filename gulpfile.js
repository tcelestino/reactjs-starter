var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')();
var connect   = require('gulp-connect');

var css = {
  concat: require('gulp-concat-css'),
  min: require('gulp-cssmin')
};

var SOURCE = {
  htmlPath: 'src/*.html',
  imgPat: 'src/images/',
  vendorPath: 'src/js/vendor/**/*.js',
  jsPath: 'src/js/**/*.js',
  jsxPath: 'src/jsx/*',
  scssPath: 'src/sass/**/*.scss',
  cssPath: 'src/css/**/*.css'
};

var BUILD = {
  htmlPath: 'public/',
  imgPath: 'public/assets/images',
  jsPath: 'public/assets/js',
  cssPath: 'public/assets/css'
};

gulp.task('clean', function () {
  return gulp.src(['public/*'], {
      read: false
    })
    .pipe(plugins.clean());
});

gulp.task('connect', function () {
  'use strict';

  var config = {
    root: 'src',
    port: 3000,
    livereload: true
  };

  connect.server(config);
});

/* DEV TASKS */

gulp.task('html-dev', function () {
  'use strict';
  return gulp.src(SOURCE.htmlPath)
    .pipe(connect.reload());
});

gulp.task('js-dev', function () {
  'use strict';
  return gulp.src('src/jsx/*.jsx')
    .pipe(plugins.plumber())
    .pipe(plugins.react())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(gulp.dest('src/js'))
    .pipe(connect.reload());
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
    .pipe(connect.reload());
});

gulp.task('dev', function () {
  'use strict';
  gulp.start('connect');
  gulp.start('html-dev');
  gulp.start('js-dev');
  gulp.start('css-dev');
});

gulp.task('watch-dev', function () {
  'use strict';

  gulp.start('dev');

  gulp.watch([SOURCE.htmlPath], ['html-dev']);
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
      'src/js/vendor/react/react-with-addons.js',
      SOURCE.jsPath
    ])
    .pipe(plugins.order([
      'src/js/vendor/*',
      'src/js/*'
    ]))
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.uglify({
      wrap: true,
      mangle: {
        except: ['React', '$', '_', 'jQuery']
      }
    }))
    .pipe(gulp.dest(BUILD.jsPath));
});

gulp.task('build-css', function () {
  'use strict';
  return gulp.src(SOURCE.cssPath)
    .pipe(css.concat('app.css'))
    .pipe(css.min())
    .pipe(gulp.dest(BUILD.cssPath))
});

gulp.task('build', function () {
  gulp.start('clean');
  gulp.start('build-js');
  gulp.start('build-css');
  gulp.start('build-html');
});

gulp.task('default', ['clean', 'watch-dev']);