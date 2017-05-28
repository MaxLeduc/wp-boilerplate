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
  './template-parts/**/*.scss',
  './src/sass/*.scss'
]

gulp.task('bs', function () {
  browserSync.init({
    proxy: 'http://localhost'
  })
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

gulp.task('components_scripts', function () {
  return gulp.src('./template-parts/**/*.js')
      .pipe(browserify({
        insertGlobals: true
      }))
      .pipe(concat('components.js'))
      .pipe(gulp.dest('./src/js'))
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

gulp.task('scripts', function () {
  return gulp.src('./src/js/*.js')
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

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
  gulp.watch(['./src/sass/*.scss', './template-parts/**/*.scss'], ['styles'])
  gulp.watch('./template-parts/**/*.js', ['components_scripts'])
  gulp.watch('./src/js/*.js', ['scripts'])
  gulp.watch('./**/**/*.php', reload)
})

gulp.task('default', ['styles', 'vendorScripts', 'components_scripts', 'scripts', 'images', 'bs', 'watch'])
