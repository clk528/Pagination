/**
 * @author clk<chenlongke@xf9.com>
 * 翻页js插件。
 * nowPage  当前页
 * pageNum  总页数
 * pageAll  总条数
 * callback 回调函数
 * 使用方法:
 *   $("divID").Pagination({
 *      nowPage:1,
 *      pageNum:Math.ceil(total/10),
 *      pageAll:total,
 *      callback:function(selPage){
 *          console.log("当前选择的页:%d",selPage);
 *      }
 *   });
 */
define(['jquery'],function($){
    "use strict";
    $.fn.Pagination = function(options){
        //用户选项覆盖插件默认选项 
        var opts = $.extend( true, {}, $.fn.Pagination.defaultOptions, options );
        var that    = this,
            pageAll = opts.pageAll,
            nowPage = opts.nowPage,
            pageNum = opts.pageNum;

        if(pageAll<=1){
            return void 0;
        }
        var first = Number(nowPage)-Number(1);
        var next = Number(nowPage)+Number(1);

        var str='<div class="h-pages clearfix"><ul class="pagination fr mt20">';

        if(first==1||first>1){
            str += '<li><a class="first" data-page="'+first+'"><img src="/static/images/zuo.png"></a></li>';
        }

        if(pageNum > 5){
            if(nowPage < 3){
                for(var page = 1; page <= 5;page ++){
                    page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str+='<li><a class="num" data-page="'+page+'">'+page+"</a></li>";
                }
            }else{
                if(pageNum-nowPage>2){
                    var pagenoTemp=nowPage-2;
                    for(var page=pagenoTemp;page<pagenoTemp+5;page++){
                        page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str+='<li><a class="num" data-page="'+page+'">'+page+"</a></li>";                            
                    }
                }else{

                    for(var page = pageNum - 4; page <= pageNum; page++){
                        page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str+='<li><a class="num" data-page="'+page+'">'+page+"</a></li>";                            
                    }
                }
            }
        } else {
            for(var page=1;page<=pageNum;page++){
                page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str += '<li><a class="num" data-page="'+page+'">'+page+"</a></li>";
            }
        }

        if(next == pageNum || next < pageNum){
            str += '<li><a class="next" data-page="'+next+'"><img src="/static/images/you.png"></a></li>';
        }
        str += "</ul></div>";
        $(that).html(str);
        $("a[data-page]").off('click').on('click',function(){
            if($.isFunction(opts.callback)){
                opts.callback.call($(this),this.dataset.page);
            }
        });
    }

    /*默认参数*/
    $.fn.Pagination.defaultOptions = {
        nowPage:1, //当前页
        pageNum:0,//总页数
        pageAll:0,//总条数
        callback:function(selPage){console.log(selPage)}
    }
});