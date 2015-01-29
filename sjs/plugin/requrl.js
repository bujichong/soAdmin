$.extend({
	/**
	 * 统一的后台ajax请求，需要sobox
	 */
	reqUrl : function(url, data, success,maskOpt) {
		var ajaxLoading = null;
		$.ajax({
			url:url,
			type:'post',
			beforeSend:function(jqXHR, settings){
				maskOpt = $.extend({showMask:false},maskOpt||{});
				ajaxLoading = $.sobox.loading(maskOpt);
				//显示"操作中"提示
			},
			complete:function(jqXHR, textStatus){
				//根据textStatus修改提示
				//2秒后去掉提示
			},
			data:data,
			dataType:'json',
			success:function (rst) {
				ajaxLoading.close();
				success&&success(rst);
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				ajaxLoading.close();
				$.sobox.pop({
					cls : 'so-popError',
					title : '错误提示',
					width : 310,
					showTitle : false,
					content : '<p class="p-popError">对不起，数据请求失败！</p>请检查网络或联系管理员...',
					btn :[{text:'确定'}]
				});
			}
		});
		return ajaxLoading;
	},
	/**
	 * 统一的后台ajax请求增强版,增加确认提示技术后台交互提示，需要sobox
	 */
	reqUrlEx : function(url, data, sucess, msg,noConfirm) {
		data=data||{};
		var ajaxLoading = null;
		if (noConfirm) {
			ajaxEvent();
		}else {
			$.sobox.confirm("提示",msg||$p.submitTip,function(){
				ajaxEvent();
			});
		}
		function ajaxEvent() {
			$.ajax({
				url:url,
				type:'post',
				beforeSend:function(jqXHR, settings){
					ajaxLoading = $.sobox.loading({cls:'so-ajaxLoading',width:158,content : '提交中，请稍候...'});
					//显示"操作中"提示
				},
				complete:function(jqXHR, textStatus){
					//根据textStatus修改提示
					//2秒后去掉提示
				},
				data:data,
				dataType:'json',
				success:function(rst){
					if(rst){
						var msg="信息提交成功",stayTime=1200;
						if(rst.tip==1){
							msg=rst.msg;
							stayTime=-1;
						}
						ajaxLoading.close();
						if(rst.state){
							ajaxLoading = $.sobox.loading({cls:'so-ajaxSuccess',width:143,maskClick:true,content : msg,stayTime : stayTime});
						}else{
							$.sobox.pop({
								cls : 'so-popError',
								title : '错误提示',
								width : 310,
								showTitle : false,
								content : '<p class="p-popError">对不起，提交数据失败！</p>'+msg,
								btn :[{text:'确定'}]
							});
						}
						//提示操作成功
					}
					if(sucess)sucess(rst);
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					ajaxLoading.close();
					$.sobox.pop({
						cls : 'so-popError',
						title : '错误提示',
						width : 310,
						showTitle : false,
						content : '<p class="p-popError">对不起，提交数据失败！</p>请检查网络或联系管理员...',
						btn :[{text:'确定'}]
					});
				}
			});
		}
	}
});