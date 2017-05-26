/**
 * Created by zhouhy on 2017/5/24.
 */
/*
* notify主要有两点，显示报错信息和报错后不终止当前的gulp任务
* */

var notify = require('gulp-notify');
module.exports = function(){
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message%>'
    }).apply(this,args);    //替换当前对象
    this.emit();    //提交
};