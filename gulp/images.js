/**
 * 处理图片相关
 * Author: Luolei
 */
var gulpSlash = require('gulp-slash'); //处理windows和unix文件夹斜杠
// var LOCAL_FOLDER = gulpSlash(__dirname).split('Yworkflow/')[0];
// process.chdir(LOCAL_FOLDER);

// var path = require('path');
// var SHELL_PATH = process.env.PWD
// var YWORKFLOW_PATH = path.resolve(__dirname, '..');
// var PROJECT_CONFIG = require(SHELL_PATH + '/.yconfig'); //载入项目基础配置


var gulp = require('gulp');
var chalk = require('chalk'); // 美化日志
var plumber = require("gulp-plumber");
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var image = require('gulp-image');
var del = require('del');

var folders = require('gulp-folders');
var gutil = require('gulp-util');

var paths = {
    img: ['/src/static/**/*.{jpg,JPG,png,PNG,gif,GIF}', '!**/sprites/*'], // 图片相关
    sass: 'src/static/**/*.scss',
    build: '/build',
    others: ['src/static/**/*.mp3'],
    prelease: '_prelease'
};




function imageOptimize() {

    return gulp.src(_progressPash + paths.img)
        .pipe(gulpSlash())
        .pipe(plumber())
        .pipe(image())
        .pipe(gulp.dest(_progressPash + paths.build));

}





// sass task
gulp.task('images', function(cb) {
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    gulp.src(_progressPash + paths.img)
        .pipe(gulpSlash())
        .pipe(plumber())
        .pipe(image())
        .pipe(gulp.dest(_progressPash + paths.build))
    cb();
});

gulp.task('images-copy', function(cb) {
     console.log('[gulp task] images-copy');
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    gulp.src(_progressPash + paths.img)
        .pipe(gulpSlash())
        .pipe(plumber())
        .pipe(gulp.dest(paths.build))
    cb();
});

gulp.task('sfile', function(cb) {
    console.log('[gulp task] sfile start');
    var _progressPash = gutil.env.path ? gutil.env.path : '';
    console.log(_progressPash);
    console.log('OUTPUT:' +_progressPash + paths.build);
    gulp.src([_progressPash + '/src/static/**/*', '/!src/static/**/*.{css,scss,js}', '/!src/static/**/sprites', '/!src/static/**/sprites/**'])
        .pipe(gulpSlash())
        .pipe(gulp.dest(_progressPash + paths.build))
    cb();
});
