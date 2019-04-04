'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    mainBowerFiles = require('gulp-main-bower-files'),
    imagemin = require('gulp-imagemin'),
    argv = require('yargs').argv;

var options = {
  src_dir: './src',
  build_dir: argv.animations ? './build-animation' : './build'
};

gulp.task('mainfiles', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest(options.build_dir + '/bower_components'))
});

gulp.task('html', function() {
  gulp.src([options.src_dir + '/*.html', '!' + options.src_dir + '/_*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
  	  context: {
  		  animations: argv.animations ? true : false
  	  }
    }))
    .pipe(gulp.dest(options.build_dir));
});

gulp.task('js', function() {
  gulp.src([options.src_dir + '/js/**/*.{js,json}'])
    .pipe(gulp.dest(options.build_dir + '/js/'));
});

gulp.task('img', function() {
  gulp.src([options.src_dir + '/img/**/*.{jpg,png,svg,ico}'])
    .pipe(imagemin())
    .pipe(gulp.dest(options.build_dir + '/img/'));
});

gulp.task('scss', function () {
  gulp.src(options.src_dir + '/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 5 versions', '> 1%']}))
    .pipe(cleanCSS({debug: true}, function(details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(options.build_dir + '/css/'));
});

gulp.task('browser-sync', function() {
    browserSync.init([options.build_dir + '/css/*.css', options.build_dir + '/*.html', options.build_dir + '/js/*.{js,json}'],{
        server: {
            baseDir: options.build_dir
        }
    });
});

gulp.task("watch", function() {
  gulp.watch(options.src_dir + '/*.html',['html']);
  gulp.watch(options.src_dir + '/scss/**/*.scss', ['scss']);
  gulp.watch(options.src_dir + '/js/**/*.{js,json}', ['js']);
  gulp.watch(options.src_dir + '/img/**/*.{jpg,png,svg,ico}', ['img']);
  gulp.watch('./bower.json', ['mainfiles']);
})


gulp.task('default', ['scss', 'html', 'js', 'img', 'watch', 'browser-sync']);
