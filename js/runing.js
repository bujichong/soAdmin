var soPro = soPro ||{}
soPro.runing = {
	init : function () {
		var me = this;
		me.initDateAndTime();//加载日历
	},
	initDateAndTime : function () {//初始化日期和时间下拉框
		if ($('.hk-date').length) {
			$('.hk-date').addClass('Wdate').each(function(){
				//window.console && console.log(this);
				$(this).click(function(){
				//window.console && console.log(this);
					var data = $T.data(this)||{};
					data = $.extend({dateFmt:'yyyy-MM-dd',readOnly:true},data);
					//window.console && console.log(data);
					WdatePicker(data);
				});
			});
		};
		if ($('.hk-time').length) {
			$('.hk-time').addClass('Wdate').css('width',140).each(function(){
				$(this).click(function(){
					var data = $T.data(this)||{};
					data = $.extend({dateFmt:'yyyy-MM-dd HH:mm',readOnly:true},data);
					WdatePicker(data);
				});
			});
		};
	}

}

$(function () {
	soPro.runing.init();
});


