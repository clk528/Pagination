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
!(function($){
	/** 使用严格模式 **/
    "use strict";
    $.fn.Pagination = function(options){
        //用户选项覆盖插件默认选项 
        var opts = $.extend( true, {}, $.fn.Pagination.defaultOptions, options );
        var that    = this,
            pageAll = opts.pageAll,
            nowPage = opts.nowPage,
            pageNum = opts.pageNum,
            showPage= opts.showPage;

        if(pageAll<=1){
            return void 0;
        }
        var str='<div class="h-pages clearfix"><ul class="pagination fr mt20">';

        if((nowPage - 1) >= 1){
            str += '<li><a class="prev" data-page="'+(nowPage - 1)+'"><img src="static/images/zuo.png"></a></li>';
        }

        if(pageNum > showPage){
            if(nowPage < showPage){
                for(var page = 1; page <= showPage; page++ ){
                    page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str+='<li><a class="num" data-page="'+page+'">'+page+"</a></li>";
                }
            } else {
                //总页数减去当前页大于2?
                if(pageNum - nowPage > 2){
                    var pagenoTemp = nowPage - 2;
                    for( var page = pagenoTemp; page < pagenoTemp + showPage; page++ ){
                        page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str+='<li><a class="num" data-page="'+page+'">'+page+"</a></li>";                            
                    }
                }else{
                    for(var page = pageNum - ( showPage -1); page <= pageNum; page++){
                        page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str+='<li><a class="num" data-page="'+page+'">'+page+"</a></li>";                            
                    }
                }
            }
        } else {
            for(var page=1;page <= pageNum; page++){
                page == nowPage ? str+='<li><span class="current">'+page+'</span></li>' : str += '<li><a class="num" data-page="'+page+'">'+page+"</a></li>";
            }
        }

        if((nowPage + 1) <= pageNum){
            str += '<li><a class="next" data-page="'+(nowPage + 1)+'"><img src="static/images/you.png"></a></li>';
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
        showPage:5,//展示多少页
        callback:function(selPage){console.log(selPage)}
    }
})(jQuery);