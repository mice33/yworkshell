/**
 * Sass
 */

var gulpSlash = require('gulp-slash'); //处理windows和unix文件夹斜杠
var LOCAL_FOLDER = gulpSlash(__dirname).split('Yworkflow/')[0];
process.chdir(LOCAL_FOLDER);


var path = require('path');
var SHELL_PATH = process.env.PWD
var YWORKFLOW_PATH = path.resolve(__dirname, '..');
var PROJECT_CONFIG = require(SHELL_PATH + '/.yconfig'); //载入项目基础配置
var gulp = require('gulp');
var chalk = require('chalk'); // 美化日志
var plumber = require("gulp-plumber");
// var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');




/**
 * csscombo调用根目录下 .csscombo.json 的配置进行格式化
 */
var csscomb = require('gulp-csscomb');
var bust = require('gulp-buster');

// 设置相关路径
var paths = {
    sass: 'src/static/**/*.scss',
    css: 'build',
    prelease: '_prelease'
};

// sass task
gulp.task('sass', function(cb) {
    //对scss文件进行编译
    gulp.src('src/static/**/*.scss')
        .pipe(gulpSlash())
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(csscomb())
        .pipe(sourcemaps.write({
            sourceRoot: paths.sass
        }))
        .pipe(gulp.dest('build'))

    //对普通css只做格式化处理
    gulp.src('src/static/**/*.css')
        .pipe(gulpSlash())
        .pipe(plumber())
        .pipe(csscomb())
        .pipe(gulp.dest(paths.css))
    cb()
});
