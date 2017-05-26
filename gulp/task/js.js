/**
 * Created by zhouhy on 2017/5/24.
 */

/*
var gulp = require('gulp');
var config = require('../config');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

gulp.task('js',function () {
   return gulp.src([config.js.src])
       .pipe(rev())  //设置hash值
       .pipe(gulp.dest(config.js.dist))
       .pipe(rev.manifest())  //设置hash值JSON
       .pipe(gulp.dest(config.js.rev))
});
gulp.task('uglify',function () {
   return gulp.src(['./assets/js/!**!/!*','!./assets/js/lib/!**!/!*'])
       .pipe(uglify())
       .pipe(rev())
       .pipe(gulp.dest(config.js.dist))
       .pipe(rev.manifest())
       .pipe(gulp.dest(config.js.rev))
});



gulp.task('rev',function () {
   return gulp.src([config.rev.revJson,config.rev.src])
       .pipe(revCollector({
          replaceReved:true
       }))
       .pipe(gulp.dest(config.rev.dist))
});

*/
