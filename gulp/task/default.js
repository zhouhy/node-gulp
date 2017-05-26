/**
 * Created by zhouhy on 2017/5/24.
 */

var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var less = require('gulp-less');
var handleErrors = require('../../utils/handleErrors');
var minify = require('gulp-minify-css');
var watch = require('gulp-watch');
var config = require('../config');


gulp.task('default',gulpsync.sync(['clean',['less','images','js'],'rev','watch']));
gulp.task('deploy',gulpsync.sync([['less-deploy','imagemin','uglify'],'rev']));

//打包图片
gulp.task('images',function () {
    return gulp.src(config.images.assets)
        .pipe(gulp.dest(config.images.dist))
});

//图片压缩
gulp.task('imagemin',function () {
    return gulp.src(config.images.assets)
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.dist))
});

//解决watch只监听文件，但并不删除，所以需要在执行任务前删除build目录
gulp.task('clean',function () {
    return gulp.src(config.clean.src)
        .pipe(clean())
});

//打包JS
gulp.task('js',function () {
    return gulp.src([config.js.src])
        .pipe(rev())  //设置hash值
        .pipe(gulp.dest(config.js.dist))
        .pipe(rev.manifest())  //设置hash值JSON
        .pipe(gulp.dest(config.js.rev))
});

//JS压缩
gulp.task('uglify',function () {
    return gulp.src(['./assets/js/**/*','!./assets/js/lib/**/*'])
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.js.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.js.rev))
});

//生成版本号，给资源文件添加时间戳，解决缓存版本控制
gulp.task('rev',function () {
    return gulp.src([config.rev.revJson,config.rev.src])
        .pipe(revCollector({
            replaceReved:true
        }))
        .pipe(gulp.dest(config.rev.dist))
});

//编译less
gulp.task('less',function () {
    return gulp.src(config.less.src)  //less源文件
        .pipe(less(config.less.settings)) //执行编译
        .on('error',handleErrors) //交给notify处理错误
        .pipe(rev())
        .pipe(gulp.dest(config.less.dist))    //输出目录
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.less.rev));
});

//发布前需要对css进行压缩
gulp.task('less-deploy',function () {
    return gulp.src(config.less.src)  //less源文件
        .pipe(less())
        .on('error',handleErrors)
        .pipe(minify())
        .pipe(rev())
        .pipe(gulp.dest(config.less.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.less.rev));
});

//监听文件是否修改
gulp.task('watch',function () {
    watch(config.less.all,function () {
        gulp.start('less'); //出现修改，立马执行less
    });
    watch(config.images.assets,function () { //监听所有image
        gulp.start('images');
    });
    watch(config.js.src,function () {
        gulp.start('js');
    });
});
