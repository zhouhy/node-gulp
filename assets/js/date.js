/**
 * Created by zhouhy on 2017/4/20.
 *
 * 对时间进行简单处理
 */

var date = {
    strToDate:function(str){
        return new Date(str.replace(/-/g, "/"));
    },
    formatStrDate:function(strDate,fmt){
        var date = strToDate(strDate);
        return date.format(fmt);
    },
    getDay:function(str){
        switch(str)
        {
            case 1:
                return '一';
            case 2:
                return '二';
            case 3:
                return '三';
            case 4:
                return '四';
            case 5:
                return '五';
            case 6:
                return '六';
            case 7:
                return '七';
            default:
                return str;
        }
    }
};




Date.prototype.format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

Date.prototype.dateDiff = function(interval,endTime)
{
    switch (interval)
    {
        case "s":   //計算秒差
            return parseInt((endTime-this)/1000);
        case "n":   //計算分差
            return parseInt((endTime-this)/60000);
        case "h":   //計算時差
            return parseInt((endTime-this)/3600000);
        case "d":   //計算日差
            return parseInt((endTime-this)/86400000);
        case "w":   //計算週差
            return parseInt((endTime-this)/(86400000*7));
        case "m":   //計算月差
            return (endTime.getMonth()+1)+((endTime.getFullYear()-this.getFullYear())*12)-(this.getMonth()+1);
        case "y":   //計算年差
            return endTime.getFullYear()-this.getFullYear();
        default:    //輸入有誤
            return undefined;
    }
}

Date.prototype.addDays = function(d)
{
    this.setDate(this.getDate() + d);
    return this;
};

module.exports = date;