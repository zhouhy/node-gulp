/**
 * Created by zhouhy on 2017/4/17.
 */
var log4js = require('log4js');

log4js.configure({
    appenders:[
        {type:'console'},
        {type:'file',filename:'logs/cheese.log',category:'cheese'}
    ]
});

var logger = log4js.getLogger("cheese");
logger.setLevel("DEBUG");
function info(msg) {
    logger.info(msg);
}

module.exports = logger;