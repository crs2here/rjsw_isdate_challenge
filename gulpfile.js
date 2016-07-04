var gulp = require('gulp'),
    connect = require('gulp-connect'),
    babel = require('gulp-babel'),
    es2015 = require('babel-preset-es2015'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    react = require('gulp-react'),
    watch = require('gulp-watch');

gulp.task('default',
    ['html_build', 'image_build', 'libs_task', 'js_build', 'sass_build', 'watch', 'connect']);

/*
 BUILD TASKS *********************************************
 */
var html_source = [
    'source/*.html',
    'source/favicon.ico'
];

gulp.task('html_build', function () {
    return gulp.src(html_source)
        .pipe(watch(html_source))
        .pipe(gulp.dest('www'))
        .pipe(connect.reload());
});

var image_source = [
    'source/img/*.*'
];

gulp.task('image_build', function () {
    return gulp.src(image_source)
        .pipe(watch(image_source))
        .pipe(gulp.dest('www/img'))
        .pipe(connect.reload());
});

var libs_source = [
    'source/libs/**/*.*'
];

gulp.task('libs_task', function () {
    return gulp.src(libs_source)
        .pipe(watch(libs_source))
        .pipe(gulp.dest('www/libs'))
        .pipe(connect.reload());
});

var js_source = [
    'source/js/app.js'
];

gulp.task('js_build', function() {
    return gulp.src(js_source)
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('www/js'))
        .pipe(connect.reload())
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        });
});

var sass_source = ['source/css/app.scss'];

gulp.task('sass_build', function () {
    return gulp.src(sass_source)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true
        }))
        .pipe(gulp.dest('www/css'))
        .pipe(connect.reload())
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        });
});

/*
 WATCH AND RELOAD TASKS *********************************************
 */

gulp.task('connect', function () {
    connect.server({
        port: 8080,
        root: 'www',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(js_source, ['js_build']);
    gulp.watch(sass_source, ['sass_build']);
});