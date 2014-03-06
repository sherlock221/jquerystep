/*!
 * 分步指引插件 by jQuery(单类插件)
 * @description jquery.step.1.0.0.js
 * @user: sherlock
 * @version 1.0.0
 */

(function($) {
    $.fn.extend({

        //插件名字
        step: function(options) {

            //设置默认值并用逗号隔开
            var defaults = {
                item: ".item",
                next: ".next",
                prev: ".prev",
                btnCallBack : function(){}   //触发按钮点击回调函数
            }

            var options =  $.extend({},defaults, options);

            var init = function($this){

                //获得子元素
                var pageList = $this.find(options.item);
                //设置编号 和 btn类型
                pageList.each(function(index){
                    var _this = $(this);
                    $(this).attr("step-index",index);

                    var nextBtn = _this.find(options.next);
                    var prevBnt = _this.find(options.prev);

                    nextBtn.attr("step-type","next");
                    prevBnt.attr("step-type","prev");

                    //阻止事件
                    if(index+1 == pageList.length){
                        nextBtn.attr("step-type","");
                    }
                    else if(index == 0){
                        prevBnt.attr("step-type","");
                        _this.show();
                    }

                    if(index != 0){
                        _this.hide();
                    }

                });

                //为按钮绑定事件
                var btn  = $this.find(options.next+","+options.prev);
                btn.click(function(){
                    var _this = $(this);
                    var parent = $(this).closest(".item");
                    var stepType = _this.attr("step-type");
                    toggle(parent,stepType);
                    //执行回调函数
                    options.btnCallBack(parent,stepType);

                });

            }


            //切换事件
             var  toggle = function(currentDom,step){
                 var number =currentDom.attr("step-index");
                 if(step == "next"){
                     currentDom.hide();
                     currentDom.next().show();
                 }
                 else if(step == "prev"){
                     currentDom.hide();
                     currentDom.prev().show();
                 }
                 else{
                     //返回第一个
                     //currentDom.hide();
                     //var firstDom = currentDom.parent().find("[step-index='0']");
                     //firstDom.show();
                 }
             }


            //遍历匹配元素的集合
            return this.each(function() {
                var $this = $(this);
                init($this);
            });



        }
    });

})(jQuery);