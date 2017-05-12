/**
 * @author clk<clk@528.com>
 * 翻页js插件。
 * currentPage  当前页
 * pageSize  总页数
 * itemsCount  总条数
 * showCtrl 是否显示页数信息
 * onSelect 回调函数
 * 使用方法:
 * $("#clk").Pagination({
 *      currentPage : 1,//当前页
 *      displayPage : 5,//展示多少页
 *      itemsCount  : total, //总数量
 *      pageSize    : Math.ceil(total/10),//总页数
 *      showCtrl    : true
 *  });
 */
!(function($){
    /** 使用严格模式 **/
    "use strict";	
    function Pagination(opts){
    	this.currentPage	= opts.currentPage;//当前页
    	this.displayPage	= opts.displayPage < 5 ? 5 : opts.displayPage;//展示多少页
    	this.itemsCount		= opts.itemsCount; //总数量
    	this.pageSize		= opts.pageSize;//总页数		  
    	this.showCtrl		= opts.showCtrl; // 是否展示页数信息
    	this.onSelect		= opts.onSelect;//点击回调事件
    	this.remote      	= opts.remote;
    }	
    Pagination.prototype = {
        _init : function (opts,hookNode){//初始化
            this.hookNode = hookNode;
            var tpl = '<div class="h-pages"></div>';
            this.hookNode.html(tpl);
            this._drawHtml();
            this.showCtrl && this._onCtrl();
            this._onSelect();
        },
        _drawHtml : function(){//画翻页主体
            var outer = this.hookNode.children('.h-pages');
            var tpl = '<ul class = "pagination fr mt20">';

            ((this.currentPage - 1) >=1 ) ? tpl+= '<li><a class="prev" data-page="'+(this.currentPage - 1)+'"><img src="static/images/zuo.png"></a></li>' : '';

            if(this.pageSize > this.displayPage){
                if(this.currentPage < this.displayPage){
                    for(var page = 1; page <= this.displayPage; page++ ){
                        page == this.currentPage ? tpl += '<li><span class="current">' + page + '</span></li>' : tpl += '<li><a class="num" data-page="' + page + '">' + page + '</a></li>';
                    }
                } else {
                    if(this.pageSize - this.currentPage > 2){
                        var pagenoTemp = this.currentPage - 2;
                        for( var page = pagenoTemp; page < pagenoTemp + this.displayPage; page++ ){
                            page == this.currentPage ? tpl += '<li><span class="current">' + page + '</span></li>' : tpl += '<li><a class="num" data-page="' + page + '">' + page + '</a></li>';
                        }
                    }else{
                        for(var page = this.pageSize - ( this.currentPage -1); page <= this.pageSize; page++){
                            page == this.currentPage ? tpl += '<li><span class="current">' + page + '</span></li>' : tpl += '<li><a class="num" data-page="' + page + '">' + page + '</a></li>';
                        }
                    }
                }
            } else {
                for(var page=1;page <= this.pageSize; page++){
                    page == this.currentPage ? tpl += '<li><span class="current">' + page + '</span></li>' : tpl += '<li><a class="num" data-page="' + page + '">' + page + '</a></li>';
                }
            }

            tpl += ((this.currentPage + 1) <= this.pageSize) ? ('<li><a class="next" data-page="'+(this.currentPage + 1)+'"><img src="static/images/you.png"></a></li></ul>') : '</ul>';
            this.showCtrl && (tpl += this._drawCtrl());
            outer.html(tpl);
            return this;
        },
        _drawCtrl : function (){//画控制信息			
            var tpl = ''+
            '<div>　'+
                '<span>' + this.itemsCount + '条</span>　'+
                '<span>共' + this.pageSize + '页</span>　' + 
                '<span>　到　<input type="text" class="page-num"/><button class="page-confirm">确定</button>页</span>' + 
            '</div>';
            return tpl;
        },
        _onCtrl : function(){
            var self = this,
            pag = self.hookNode.children('.h-pages');
            function doPagination() {
                var tmpNum = parseInt(pag.find('.page-num').val());
                if ($.isNumeric(tmpNum) && tmpNum <= self.pageSize && tmpNum > 0) {
                    if (!self.remote) {
                        self.currentPage = tmpNum;
                        self._drawHtml();
                    }
                    if ($.isFunction(self.onSelect)) {
                        self.onSelect.call($(this), tmpNum);
                    }
                }
            }
            pag.on('click','.page-confirm',function(e) {
                doPagination.call(this);
            });
            pag.on('keypress','.page-num',function(){
                event.which == 13 && doPagination.call(this);
            });
            return this;
        },
        _onSelect : function (){
            var self = this;
            self.hookNode.children('.h-pages').on('click', 'a', function (e) {
                e.preventDefault();
                var tmpNum = parseInt($(this).attr('data-page'));
                if(!self.remote){
                    self.currentPage = tmpNum;
                    self._drawHtml();
                }
                if ($.isFunction(self.onSelect)) {
                    self.onSelect.call($(this), tmpNum);
                }
            });
            return this;
        }
    };

    $.fn.Pagination = function(options){
        var opts = $.extend({}, $.fn.Pagination.defaults, typeof options == 'object' && options);
        return new Pagination(opts)._init(opts,$(this));
    };
	
    $.fn.Pagination.defaults = {
        currentPage : 1,//当前页
        displayPage : 5,//展示多少页
        itemsCount  : 0, //总数量
        pageSize    : 0,//总页数        
        showCtrl    : false,// 是否展示页数信息
        onSelect    : true,//点击回调事件
        remote      : true
    };
})(window.jQuery);
