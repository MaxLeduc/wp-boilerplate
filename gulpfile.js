var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  imageMin = require('gulp-imagemin'),
  minifyCSS = require('gulp-minify-css'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  browserify = require('gulp-browserify')

var vendorScripts = [
  './node_modules/jquery/dist/jquery.min.js'
]

var stylesPaths = [
  './includes/**/*.scss',
  './src/sass/styles.scss'
]

var defaultTasks = [
  'styles',
  'vendorScripts',
  'scripts',
  'images',
  'bs',
  'watch'
]

gulp.task('bs', function () {
  browserSync.init({
    proxy: 'http://localhost'
  })
})

gulp.task('styleguide_styles', function () {
  return gulp.src('./src/sass/styleguide.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('styleguide.css'))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }))
})

gulp.task('styles', function () {
  return gulp.src(stylesPaths)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }))
})

gulp.task('vendorScripts', function () {
  return gulp.src(vendorScripts)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream: true}))
})

gulp.task('includes_scripts', function () {
  return gulp.src(['./includes/**/*.js'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(concat('includes.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream: true}))
})

gulp.task('scripts', ['includes_scripts'], function () {
  return gulp.src(['./dist/js/includes.min.js', './src/js/*.js'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream: true}))
})

gulp.task('images', function () {
  return gulp.src('./images/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./images'))
})

gulp.task('watch', function () {
  gulp.watch(['./src/sass/*.scss', './includes/**/*.scss'], ['styles'])
  gulp.watch('./includes/**/*.js', ['includes_scripts'])
  gulp.watch('./src/js/*.js', ['scripts'])
  gulp.watch('./**/**/*.php', reload)
})

gulp.task('default', defaultTasks)
gulp.task('styleguide', ['styleguide_styles'])
