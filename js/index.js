var sos =sos||{};

sos.index = {
	init : function () {
		var me = this;
		me.clickSideSub();//点击展开tab
		me.tabClose();//tab关闭事件
		me.tabClick();//tab点击事件
		me.sideExIntend();//展开或收缩侧边栏菜单
	},
	clickSideSub : function  () {
		var me = this;
		me.openUrlInIframe.call($('.a-sidesub'),function (obj) {
			$('.a-sidesub').removeClass('sideSubNow');
			$(obj).addClass('sideSubNow');
		});
	},
	tabClose : function () {
		var me = this;
		me.tabCloseEvent.call($('.s-conttitle .em-close'));
	},
	tabClick : function () {
		var me = this;
		me.tabClickEvent.call($('.s-conttitle'));
	},
	sideExIntend : function () {
		var now = 0;
		$('.a-sidenav').click(function() {
			var index = $('.a-sidenav').index(this);
			if (now!=index) {
				$('.ul-sidesub').slideUp('fast');
				$(this).next('.ul-sidesub').slideDown('fast');
				now = index;
			};
			return false;
		});
	},
	openUrlInIframe : function (callback) {
		$(this).click(function() {
			try{
				var href = $(this).attr('href');
				var title = $(this).attr('title')||$(this).text();
				var $tabEm =$.tDom('.em-conttitle:contains("'+title+'")');
				if ($tabEm.length) {//如果存在tab
					var $st = $tabEm.parent();
					var index = $.tDom('.s-conttitle').index($st);
					$.tDom('.s-conttitle-now').removeClass('s-conttitle-now');
					$st.addClass('s-conttitle-now');
					$.tDom('.iframeTabBox').hide().eq(index).show();
				}else{//不存在就新建
					$.tDom('.s-conttitle-now').removeClass('s-conttitle-now');
					$.tDom('.iframeTabBox').hide();
					$.tDom('.main-conthead').append('<span class="s-conttitle s-conttitle-now"><em class="em-conttitle">'+title+'</em><em class="em-close">X</em></span>');
					$.tDom('.main-iframebox').append('<div class="iframeTabBox"><iframe id="mainIframe" src="'+href+'" frameborder="0" height="100%" width="100%" scrolling="auto"></iframe></div>');
					sos.index.tabClickEvent.call($.tDom('.main-conthead .s-conttitle:last'));
					sos.index.tabCloseEvent.call($.tDom('.main-conthead .em-close:last'));
				};
				callback&&callback(this);
			}catch(e){
				window.console && console.log(e);
			}
			return false;
		});
	},
	tabClickEvent : function () {
		var  timeFn = null;
		$(this).click(function() {//单击显示当前tab
			try{
				var _self = $(this);
				window.console && console.log(_self);
				var index =_self.index();
				$.tDom('.s-conttitle-now').removeClass('s-conttitle-now');
				_self.addClass('s-conttitle-now');
				$.tDom('.iframeTabBox').hide().eq(index).show();
			}catch(e){
				window.console && console.log(e);
			}

		});
		$(this).dblclick(function() {//双击关闭当前tab
			sos.index.closeIndexTab($(this));
		});
	},
	tabCloseEvent : function () {
		$(this).click(function() {//点击 X 关闭当前tab
			var $st = $(this).parent();
			sos.index.closeIndexTab($st);
		});
	},
	closeIndexTab : function ($nowTitle) {
		var index = $.tDom('.s-conttitle').index($nowTitle);
		if (index) {//非第一个tab
			$.tDom('.iframeTabBox').eq(index).remove();
			$nowTitle.remove();
			if($.tDom('.s-conttitle-now').length==0){//如果不存在当前tab
				$.tDom('.s-conttitle').eq(index-1).addClass('s-conttitle-now');
				$.tDom('.iframeTabBox').eq(index-1).show();
			}
		};
	}

};


$(function () {
	sos.index.init();
});
