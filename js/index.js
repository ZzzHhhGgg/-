$(function() {
    //当点击了li 不需执行页面滚顶里面的li的背景选择
    //节流阀  互斥锁
    var flag = true;
    var toolTop = $(".recommend-hd").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function() {
        toggleTool();
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            });
        }
    });
    //2.电梯导航小模块滚动到相应区域
    $(".fixedtool li").click(function() {
        flag = false;
        //当点击小li得到相应索引内容的高度
        var current = $(".floor .w").eq($(this).index()).offset().top;
        //利用animate的回调函数，当滚动完后将节流阀的flag还原为true
        $("body,html").stop().animate({
            scrollTop: current + 1
        }, function() {
            flag = true;
        });
        //点击之后，移除current类名，当前加上
        $(this).addClass("current").siblings().removeClass();
    });
    //内容区域控制小li背景颜色，当前显示current类
})