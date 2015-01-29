(function($){

$.extend(jQuery.easing,{
//	def: 'easeInOutExpo',
//	swing: function (x, t, b, c, d) {
//		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
//	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});

$.fn.extend({
	//使用如： $(".ul_nav li").hoverClass("over");
	hoverClass:function (className) {
		var _self = this;
		_self.each(function (i) {
			_self.eq(i).mouseenter(function () {
				$(this).addClass(className);
			});
			_self.eq(i).mouseleave(function () {
				$(this).removeClass(className);
			});
		});
	return _self;
	},
	//使用如： $(".ul_nav li").overOnlyClass("over");
	overOnlyClass : function (className) {
		var _self = this;
		_self.each(function (i) {
			_self.eq(i).mouseenter(function () {
				_self.removeClass(className);
				$(this).addClass(className);
			});
		});
		return _self;
	},
	// 盒子内的图片超过盒子宽度时自动适应宽度，并添加在新窗口打开的链接，
	//可设置自定义宽度，不设置宽度时，所限宽度为盒子的宽度
	//$("#imgBox").autoImgW();
	//$("#imgBox").autoImgW(650);
	autoImgW : function (imgW) {
		var _self = this;
		var w = (imgW == null)?_self.width():imgW;
		var img = _self.find('img');
		img.each(function (i) {
			var iW = $(this).width();
			var iH = $(this).height();
			var iSrc = $(this).attr('src');
			if(iW>=w){
				$(this).css({width:w,height:iH*(w/iW)}).wrap("<a href="+iSrc+" target='_blank' title='点击在新页面查看大图' ></a>")
			}
		});
		return _self;
	},
	// select在新页面打开友情链接
	//使用如： $("#selFriendLink").openSelVal();
	//在当前窗口打开select框的链接：
	// $("#selFriendLink").openSelVal('self');
	openSelVal : function (target) {
		var _self = this;
		_self.change(function(){
			if (_self.val()!=0) {
				if (target =='self'){
				window.location=_self.val();
			}else{window.open(_self.val());}
			}
		});
		return _self;
	},
	//textFocus
	textFocus : function (o) {
			var o = $.extend({
				val :null,//default value,if user no input ,show this value
				focusCls : 'txt-focus',//focus class
				changeCls : 'txt-change',//text change class
				keyback: function(){}//keyup callback
			},o||{});
			var fc = o.focusCls, cc = o.changeCls;
			this.each(function () {
				var _self = $(this);
				var v=(o.val==null)?$(_self).val():o.val;
				 _self.val(v);
				_self.focus(function () {
					(_self.val()==v)&&_self.val("");
					fc&&_self.addClass(fc);
				});
				_self.blur(function(){
					(_self.val()=="")&&_self.val(v);
					fc&&_self.removeClass(fc);
				});
				cc&&_self.keyup(function(){
					if(_self.val()!=v&&_self.val()!=''){
						_self.addClass(cc);
					}else {
						_self.removeClass(cc);
					}
					o.keyback(_self);
				});
			});
			return this;
		},
		//autoSameH
		autoSameH : function (o) {
			var o = $.extend({
				b : null,
				cut : 0
			},o||{});
			if (o.b==null) {
				o.b = this;
			}
			var h  = this.height();
			var maxH = 0;
			$(o.b).each(function () {
				var th = $(this).height();
				maxH = (maxH>=th)?maxH:th;
			});
			maxH = maxH>=h?maxH:h;
			this.height(maxH);
			$(o.b).height(maxH-o.cut);
			return this;
		},
		//soScrollTo
		//html : <a href="#mainnav">滚动到id为mainnav对象的位置</a>
		//js : $('.a-scrollTo').soScrollTo();
		soScrollTo : function (o) {
			var o = $.extend({
				direction : 'y',//'y'||'x'
				speed : 800,//间隔时间
				offset : 0,//偏移
				easeType : 'easeInOutExpo'//'easeInOutExpo'||'swing'
			},o||{});
			var _self = $(this);
			_self.click(function () {
				var tim = $(this).attr('href');
				tim = $(tim!='#'?tim:'body');
				if(tim.length){
					var pos = {t:tim.offset().top+o.offset||0,l:tim.offset().left+o.offset||0};
					if (o.direction=='x') {
						$("html,body").stop().animate({'scrollLeft': pos.l}, o.speed,o.easeType);
					}else {
						$("html,body").stop().animate({'scrollTop': pos.t}, o.speed,o.easeType);
					}
				}
				return false;
			});
		},
		//$('.lazybox').soLazy({'type':'delay'});
		soLazy: function(o){
			o = $.extend({
				type : 'scroll',//scroll,delay
				imgTag : 'src2',
				defHeight : 40,
				defDelay : 4000
			},o||{});
			var _self = $(this);
			var img=_self.find("img"),imgTag = o.imgTag;
			if (o.type == "scroll") {
				var pageTop=function(){
					return document.documentElement.clientHeight+Math.max(document.documentElement.scrollTop,document.body.scrollTop)-o.defHeight;
				};
				var imgLoad=function(){
					img.each(function(){
						if ($(this).offset().top<=pageTop()){
							var imgPath=$(this).attr(imgTag);
							if (imgPath){
							$(this).attr("src",imgPath).removeAttr(imgTag);
							}
						}
					});
				};
				imgLoad();
				$(window).bind("scroll",function(){
					imgLoad();
				});
			}
			if (o.type == "delay") {
				var dl = setTimeout(function () {
					img.each(function () {
						var imgPath=$(this).attr(imgTag);
						if (imgPath){
						$(this).attr("src",imgPath).removeAttr(imgTag);
						}
					});
				},o.defDelay);
			}
			return _self;
		}
	});
})(jQuery);