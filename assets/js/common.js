/**
 * Created by zhouhy on 2017/4/21.
 * 公共 JS
 */
$(function(){
    $(".nav").slide({
        type: "menu",
        titCell: ".navli",
        targetCell: ".subnav",
        effect: "slideDown",
        delayTime: 300,
        triggerTime: 0,
        returnDefault: true,
        defaultPlay:false
    });
});