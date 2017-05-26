
module.exports=query;
function query(options) {
    var curpage=1;
    var pagesize=10;
    var displayFields="";
    if (typeof (options)=="string"){
        //默认传入资源名称请求
        this.resource_name=options;
    }else if(typeof (options)=="object"){
        this.resource_name=options.resource_name;
        //判断current_page
        if (typeof (options.current_page)=="number"){
            curpage=parseInt(options.current_page);
        }
        if (typeof (options.page_size)=="number"){
            pagesize=parseInt(options.page_size);
        }
        if (typeof (options.display_fields)!="undefined"&&options.display_fields==null&&options.display_fields==""){
            displayFields=options.display_fields;
        }
    }
    this.display_fields=displayFields;
    this.current_page=curpage;
    this.page_size=pagesize;
    this.query=new Criteria();
    this.rels=new Array();
    this.sort=new Array();
}

function Criteria() {
    this.must=new Array();
    this.must_not=new Array();
    this.should=new Array();
}

Array.prototype.addTerm=function (key, value) {
    var obj=new Object();
    obj[key]=value;
    this.push({term:obj});
    return this;
}

Array.prototype.addFuzzy=function (key, value) {
    var obj=new Object();
    obj[key]=value;
    this.push({fuzzy:obj});
    return this;
}

Array.prototype.addPrefix=function (key, value) {
    var obj=new Object();
    obj[key]=value;
    this.push({prefix:obj});
    return this;
}

Array.prototype.addRange=function (key, value) {
    var obj=new Object();
    obj[key]=value;
    this.push({range:obj});
    return this;
}

/***
 * 获取must条件集合
 */
query.prototype.getMust=function () {
    return this.query.must;
}

/***
 * 获取should条件集合对象
 */
query.prototype.getShould=function () {
    return this.query.should;
}

/***
 * 获取mustNot条件集合对象
 */
query.prototype.getMustNot=function () {
    return this.query.must_not;
}

//基本属性

/***
 * 设置当前请求分页
 * @param current_page
 */
query.prototype.setCurrentPage=function (current_page) {
    if (typeof (current_page)=="number"){
        this.current_page=current_page;
    }

}
/***
 * 设置当前请求页码大小
 * @param page_size
 */
query.prototype.setPageSize=function (page_size) {
    if (typeof (page_size)=="number"){
        this.page_size=page_size;
    }
}

/***
 * 设置表名
 * @param resource_name
 */
query.prototype.setResourceName=function (resource_name) {
    if (typeof (resource_name)=="string"){
        this.resource_name=resource_name;
    }
}
/***
 * 设置展示字段
 * @param display_fields
 */
query.prototype.setDisplayFields=function (display_fields) {
    this.display_fields=display_fields;
}

query.prototype.setPkId=function(pkid){
    this.id=pkid;
}
/**
* 添加关系
*/
query.prototype.addRelation=function(relation){
    this.rels.push(relation);
}


/***
 * json格式转字符串
 */
query.prototype.toString=function () {
    var qry=this.query;
    this.query=JSON.stringify(qry);
    return JSON.stringify(this);
}




/**
* 排序功能
* @param column 排序字段名称
* @param rule 排序规则,枚举类型,只有2中,asc-顺序,desc-倒序
*/
query.prototype.addSort=function(column,rule){
    var obj={column:column,rule:rule};
    this.sort.push(obj);
}
