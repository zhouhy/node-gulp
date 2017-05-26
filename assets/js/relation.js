/**
 * Created by xiaoymin on 2017/3/21.
 */
/*
 *
 * 关联属性类
 *
 */
function relation(){
    this.rel_type="o2o";
    var args=arguments;
    console.log(args)
    //获取第一个
    this.rel_res_name=args[0];
    this.rel_res_field=args[1];
    //main_field
    if(typeof(args[2])!="undefined"){
        this.main_field=args[2];
    }
    this.rels=new Array();
}

relation.prototype.addRelation=function(relation){
    this.rels.push(relation);
}


exports.relation=relation