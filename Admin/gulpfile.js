'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    mainBowerFiles = require('gulp-main-bower-files'),
    argv = require('yargs').argv;;

gulp.task('mainfiles', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('./build/bower_components'))
});

gulp.task('html', function() {
  gulp.src(['./src/*.html', "!./src/_*.html"])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        demo: argv.demo ? true : false
      }
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('js', function() {
  gulp.src(['./src/js/**/*.*'])
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('img', function() {
  gulp.src(['./src/img/**/*.*'])
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('scss', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 15 versions', '> 1%']}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["./build/css/*.css", "./build/*.html", "./build/js/*.js"],{
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task("watch", function() {
  gulp.watch("./src/*.html",["html"]);
  gulp.watch('./src/scss/**/*.scss', ['scss']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/img/**/*.*', ['img']);
  gulp.watch('./bower.json', ['mainfiles']);
})


gulp.task('default', ['scss', 'html', 'js', 'img', 'watch', 'browser-sync']);
