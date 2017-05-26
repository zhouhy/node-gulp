/**
 * Created by zhouhy on 2017/5/24.
 */
/*
* gulp命令会由gulpfile.js运行，所以src,和build文件夹路径如下：
* */

var src = './assets';
var dist = './build';

module.exports = {
    less:{
        all: src + '/less/*.less',   //所有less
        src: src + '/less/*.less',   //需要编译的less
        dist: dist + '/css',    //输出目录
        settings: { //编译less过程需要的配置，可以为空

        },
        rev: dist + "/rev/css",
    },
    images:{
        assets: src + '/img/**/*',
        dist: dist + '/img'
    },
    js:{
        src: src + '/js/**/*',
        dist: dist + '/js',
        rev: dist + '/rev/js'
    },
    clean:{
        src: dist
    },
    rev:{
        revJson: dist + '/rev/**/*.json',   //js和css任务生成的文件名对应关系的json
        src: './views/**/*.html', //root  index.html 所有的html文件
        dist: './views'
    }
};