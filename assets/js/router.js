/**
 * Created by zhouhy on 2017/4/20.
 * 路由配置
 */
var express = require('express');
var query = require('./query');
var logger = require('../../utils/logger');
var request = require('request');
var config = require('./static.config');
var async = require('async');
var date = require('./date');
var laypage = require('laypage');





var router = express.Router();



router.get('/',function(req,res){
    logger.info('首页');

    var templateData = [],
        displayFields = 'id,title,type,click_num,create_time,description,img',
        now = new Date(),
        today = now.format('yyyy 年 MM 月 dd 日'),
        week = date.getDay(now.getDay());

    async.series([
        function(callback){
            var zwdtQuery = new query({
                'resource_name': 'news_center_info',
                'current_page': 1,
                'page_size': 8
            });
            zwdtQuery.getMust().addTerm('type','政务动态');
            zwdtQuery.setDisplayFields(displayFields);
            request.post({
                    url: config.domain + config.list,
                    form:{"service":zwdtQuery.toString()}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['zwdt'] = record;
                    callback(null);
                }
            );
        },
        function(callback){
            var zwdtQuery = new query({
                'resource_name': 'news_center_info',
                'current_page': 1,
                'page_size': 4
            });
            zwdtQuery.getMust().addTerm('type','通知公告');
            zwdtQuery.setDisplayFields(displayFields);
            request.post({
                    url: config.domain + config.list,
                    form:{"service":zwdtQuery.toString()}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['tzgg'] = record;
                    callback(null);
                }
            );
        },
        function(callback){
            var zwdtQuery = new query({
                'resource_name': 'news_center_info',
                'current_page': 1,
                'page_size': 4
            });
            zwdtQuery.getMust().addTerm('type','行业动态');
            zwdtQuery.setDisplayFields(displayFields);
            request.post({
                    url: config.domain + config.list,
                    form:{"service":zwdtQuery.toString()}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['hydt'] = record;
                    callback(null);
                }
            );
        },
        function(callback){
            var zwdtQuery = new query({
                'resource_name': 'news_center_info',
                'current_page': 1,
                'page_size': 4
            });
            zwdtQuery.setDisplayFields(displayFields);
            zwdtQuery.addSort('create_time','desc');
            request.post({
                    url: config.domain + config.list,
                    form:{"service":zwdtQuery.toString()}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['hot'] = record;
                    callback(null);
                }
            );
        },
        function (callback) {
            var zwdtQuery = new query({
                'resource_name': 'news_center_info',
                'current_page': 1,
                'page_size': 4
            });
            zwdtQuery.setDisplayFields(displayFields);
            zwdtQuery.getMust().addTerm('is_push','Y');
            request.post({
                    url: config.domain + config.list,
                    form:{"service":zwdtQuery.toString()}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['banner'] = record;
                    callback(null);
                }
            );
        }
    ],function(err){
        res.render('./index',{data:templateData,week:week,today:today,nav:'home'});
    });




});

router.get('/newsDetail/:id',function(req,res){
    logger.info('新闻详情');

    var templateData = [],
        displayFields = 'id,title,type,click_num,create_time,description,img';


    async.series([
        function(callback){
            request.post({
                    url: config.domain + config.newsClick,
                    form:{"news_id":req.params.id}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['detail'] = record;
                    callback(null)
                }
            );
        },
        function(callback){
            var newsQuery = new query({
                'resource_name': 'news_center_info',
                'current_page': 1,
                'page_size': 5
            });
            newsQuery.setDisplayFields(displayFields);
            newsQuery.addSort('click_num','desc');
            request.post({
                    url: config.domain + config.list,
                    form:{"service":newsQuery.toString()}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['hot'] = record;
                    callback(null);
                }
            );
        },
        function(callback){
            var newsQuery = new query({
                'resource_name': 'news_center_info',
                'current_page': 1,
                'page_size': 5
            });
            newsQuery.setDisplayFields(displayFields);

            newsQuery.getMust().addTerm('type',templateData.detail.data.type);
            request.post({
                    url: config.domain + config.list,
                    form:{"service":newsQuery.toString()}
                },
                function(err, response, body){
                    var record = JSON.parse(body);
                    templateData['relation'] = record;
                    callback(null);
                }
            );
        }
    ],function(err){
        res.render('newsDetail',{data:templateData,nav:'news'});
    });

});

router.get('/news/:type/page/:page',function (req,res) {
    logger.info('新闻列表');
    var type = req.params.type,
        page = parseInt(req.params.page),
        title = '新闻中心',
        displayFields = 'id,title,type,click_num,create_time,description,img',
        keywords = req.query.title;
    switch (type){
        case 'zwdt':
            title = "政务动态";
            break;
        case 'hyxw':
            title = '行业动态';
            break;
        case 'tzgg':
            title = '通知公告';
            break;
        default:
            title = '新闻中心';
    };

    var newsQuery = new query({
        'resource_name': 'news_center_info',
        'current_page': page,
        'page_size': 18
    });
    newsQuery.setDisplayFields(displayFields);
    if(title != '新闻中心'){
        newsQuery.getMust().addTerm('type',title);
    }
    if(keywords != undefined){
        newsQuery.getMust().addFuzzy('title',keywords);
        title = keywords;
    }
    console.log(title)
    request.post({
            url: config.domain + config.list,
            form:{"service":newsQuery.toString()}
        },
        function(err, response, body){
            var record = JSON.parse(body);
            res.render('news',{
                data:record,
                type:title,
                count:record.data.length,
                laypage:laypage({
                    curr: req.params.page || 1
                    ,url: req.url //必传参数，获取当前页的url
                    ,pages: record.total_page //分页总数你需要通过sql查询得到
                }),
                nav:'news'
            });
        }
    );


});

router.get('/advice/page/:page',function (req,res) {
    logger.info('问题咨询...')

    var page = parseInt(req.params.page),
        keywords = req.query.search;
    var questionQuery = new query({'resource_name': 'question_ask_info','current_page': page,'page_size': 10});
    if(keywords != undefined){
        questionQuery.getMust().addFuzzy('title',keywords);
    }
    questionQuery.addSort('create_time','desc');
    request.post({
        url:config.domain + config.list,
        form:{'service':questionQuery.toString()}
    },function (err,respones,body) {
        var record = JSON.parse(body);
        res.render('advice',{nav:'advice',data:record,current_page:page,laypage:laypage({
            curr: req.params.page || 1
            ,url: req.url //必传参数，获取当前页的url
            ,pages: record.total_page //分页总数你需要通过sql查询得到
        })});
    });
});

router.get('/company',function (req,res) {
    logger.info('公司概况');
    var generalQuery = new query({'resource_name': 'company_general','current_page': 1,'page_size': 1});
    request.post({
        url:config.domain + config.list,
        form:{'service':generalQuery.toString()}
    },function (err,respones,body) {
        var record = JSON.parse(body);
        console.log(record)
        res.render('company',{nav:'organization',data:record,current_page:1});
    });
});

router.get('/advice/detail/:id',function (req,res) {
   logger.info('问题咨询详情...');
   var id = req.params.id;
    var questionQuery = new query({'resource_name': 'question_ask_info'});
    questionQuery.setPkId(id);
   request.post({url:config.domain + config.detail,form:{'service':questionQuery.toString()}},function (err,resp,body) {
      var record = JSON.parse(body);
       if(record.data.reply != null && record.data.reply.indexOf("\n") >= 0) {
           record.data.reply = record.data.reply.replace(/\n/g, '<br />');
       }
       if(record.data.content != null && record.data.content.indexOf('\n') >= 0) {
           record.data.content = record.data.content.replace(/\n/g, '<br />');
       }
      res.render('adviceDetail',{data:record,nav:'advice'});
   });
});

router.get('/organization',function (req,res) {
   res.render('organization',{nav:'organization'});
});
router.get('/tousuxuzhi',function (req,res) {
    logger.info('投诉须知....');
    var complaintQuery = new query({'resource_name':'complain_notice','page_size':20,'current_page':1});
    request.post({
        url:config.domain + config.list,
        form:{'service':complaintQuery.toString()}
    },function (err,response,body) {
        var record = JSON.parse(body),
            _len = record.data.length,
            _arr = [];
        for(var i = 0;i<_len;i++){
            var obj = record.data[i];
            if(obj.state.indexOf('\n') >= 0){
                record.data[i].state = record.data[i].state.replace(/\n/g,'<br />');
            }
        }
        res.render('tousuxuzhi',{data:record,nav:'advice'});
    })
});

router.get('/onlineComplaint',function (req,res) {
    logger.info('在线投诉....');
    res.render('onlineComplaint',{nav:'advice'});
});
router.post('/submitComplaint',function (req,res) {
    logger.info('提交投诉...')
    var params = req.body;
    request.post({
        url:config.domain + config.submitComplaint,
        form:params
    },function (err,respones,body) {
        res.json(JSON.parse(body));
    })
});
router.post('/submitQuestion',function (req,res) {
    logger.info('提交问题...');
    request.post({
        url:config.domain + config.submitQuestion,
        form:req.body
    },function (err,respones,body) {
       res.json(JSON.parse(body));
    });
})

module.exports = router;