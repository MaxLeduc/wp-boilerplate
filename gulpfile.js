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
  browserify = require('gulp-browserify'),
  watch = require('gulp-watch'),
  sassGlob = require('gulp-sass-glob')
  // del = require('del'), // should add a 'clean' task in the future
  // gutil = require('gulp-util') // useful to console log in terminal

var vendorScripts = [
  './node_modules/jquery/dist/jquery.min.js'
]

var stylesWatchPaths = [
  './src/global/sass/**/*.scss',
  './src/components/**/*.scss'
]

var stylesCompilePaths = [
  './src/global/sass/style.scss',
  './node_modules/slick-carousel/slick/slick.css'
]

var defaultTasks = [
  'styles',
  'vendorScripts',
  'components_scripts',
  'global_scripts',
  'images',
  'browserSync'
]

gulp.task('browserSync', function () {
  browserSync.init({
   proxy: 'http://localhost:8888'
  })
})

gulp.task('styles', function () {
  return gulp.src(stylesCompilePaths)
    .pipe(sassGlob())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
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

gulp.task('components_scripts', function () {
  return gulp.src(['./src/components/index.js'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(concat('components.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream: true}))
})

gulp.task('global_scripts', function () {
  return gulp.src(['./src/global/js/index.js'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(concat('global.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream: true}))
})

gulp.task('images', function () {
  return gulp.src('./src/images/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./dist/images'))
})

var watchTasks = [
  { name: 'watch-css', filepath: stylesWatchPaths, callback: ['styles'] },
  { name: 'watch-js-components', filepath: ['./src/components/**/*.js'], callback: ['components_scripts'] },
  { name: 'watch-js-general', filepath: './src/global/js/**/*.js', callback: ['global_scripts'] },
  { name: 'watch-php', filepath: ['./*.php', './src/components/**/*.php'], callback: false }
]

function createWatchFunctions () {
  watchTasks.forEach(function (task) {
    gulp.task(task.name, function () {
      if (task.callback) {
        return watch(task.filepath, function () {
          gulp.run(task.callback)
        })
      } else {
        return watch(task.filepath, reload)
      }
    })
  })
}

function addWatchFunctionsToDefault () {
  watchTasks.forEach(function (task) {
    defaultTasks.push(task.name)
  })
}

createWatchFunctions()
addWatchFunctionsToDefault()

gulp.task('default', defaultTasks)
gulp.task('styleguide', ['styleguide_styles'])
