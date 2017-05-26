/**
 * Created by zhouhy on 2017/5/24.
 */

/*
var gulp = require('gulp');
var less = require('gulp-less');
var config = require('../config').less;
var handleErrors = require('../../utils/handleErrors');
var minify = require('gulp-minify-css');
var rev = require('gulp-rev');

gulp.task('less',function () {
   return gulp.src(config.src)  //less源文件
       .pipe(less(config.settings)) //执行编译
       .on('error',handleErrors) //交给notify处理错误
       .pipe(rev())
       .pipe(gulp.dest(config.dist))    //输出目录
       .pipe(rev.manifest())
       .pipe(gulp.dest(config.rev));
});

gulp.task('less-deploy',function () {
    return gulp.src(config.src)  //less源文件
        .pipe(less())
        .on('error',handleErrors)
        .pipe(minify())
        .pipe(rev())
        .pipe(gulp.dest(config.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev));
})*/
