'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var reporter = require("postcss-reporter");
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var browserslist = require('browserslist');

var stylelint = require("stylelint");
var cssnano = require('cssnano');
var color_rgba_fallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoelements = require('postcss-pseudoelements');
var vmin = require('postcss-vmin');
var pixrem = require('pixrem');
var will_change = require('postcss-will-change');
var atImport = require('postcss-import');
var bem = require('postcss-bem');
var nested = require('postcss-nested');
var mixins = require('postcss-mixins');
var vars = require('postcss-simple-vars');
var each = require('postcss-each');
var fors = require('postcss-for');
var conditionals = require('postcss-conditionals');
var lost = require('lost');


gulp.task('css', function () {
  var processors = [
    atImport,
    stylelint,
    // pre
    bem,
    mixins,
    vars,
    conditionals,
    each,
    fors,
    nested,
    lost,

    // post
    will_change,
    autoprefixer({browsers: browserslist(['> 1%', 'last 2 versions', 'ie >= 8', 'IOS >= 6', 'Android >= 4'])}),
    color_rgba_fallback,
    opacity,
    pseudoelements,
    vmin,
    pixrem,

    mqpacker,
    // cssnano, //css 压缩
    reporter({ clearMessages: true })
  ];
  return gulp.src('./src/css/style.css')
    .pipe( sourcemaps.init() )
    .pipe(postcss(processors))
    .pipe( sourcemaps.write('.') )
    .pipe(gulp.dest('./public/css'));
});

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    script: 'app.js',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000

    // open the proxied app in chrome
    //browser: ['google-chrome']
  });
});

gulp.task('js',  function () {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});


gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync','css','js'], function () {
  gulp.watch('./src/js/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch("./src/css/*.css", ['css']).on('change', browserSync.reload);
  gulp.watch('./views/*.html', ['bs-reload']);
});
