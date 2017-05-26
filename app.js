var express = require('express');
var request = require('request');
var path = require('path');
var logger = require('./utils/logger');
var port = process.env.port || 4000;
//var template = require('art-template');
var template = require('express-art-template');
var bodyParser = require('body-parser');
var app = express();

//var ejs = require('ejs')

app.use(express.static(path.join(__dirname, 'build'))); //设置静态资源目录
app.set('views','./views');

/*
//PS:这段代码是在arttemplate版本在4.0以下的，4.0以下模板是不能实时刷新的，解决办法是安装express-art-template
template.config('base','');//指定模板目录
template.config('extname','.html');//指定模板后缀名
app.engine('.html',template.__express);
*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.engine('.html',template); //修改模板后缀后
app.set('view engine', 'html');

app.listen(port);





app.use('/',require('./assets/js/router'));
