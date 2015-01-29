/* 扩展$ */
$.extend({
    /**
     * 统一的后台ajax请求
     */
    reqUrl: function(url, data, success, showMask) {
        var ajaxLoading = null;
        $.ajax({
            url: url,
            type: 'post',
            beforeSend: function(jqXHR, settings) {
                maskOpt = {
                    showMask: !!showMask || false
                };
                ajaxLoading = $.sobox.loading(maskOpt);
                //显示"操作中"提示
            },
            complete: function(jqXHR, textStatus) {
                //根据textStatus修改提示
                //2秒后去掉提示
            },
            data: data,
            dataType: 'json',
            success: function(rst) {
                ajaxLoading.close();
                success && success(rst);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                ajaxLoading.close();
                setTimeout(function() {
                    $.sobox.pop({
                        cls: 'so-popError',
                        title: '错误提示',
                        width: 360,
                        showTitle: false,
                        content: '<p class="p-popError">对不起，数据请求失败！</p>请检查网络或联系管理员...',
                        btn: [{
                            text: '确定'
                        }]
                    });
                }, 100);
            }
        });
        return ajaxLoading;
    },
    /**
     * 统一的后台ajax请求增强版,增加确认提示技术后台交互提示
     */
    reqUrlEx: function(o) {
        var o = $.extend({
            url: null,
            type: 'post',
            data: {},
            success: null,
            msg: '您确定要提交吗?',
            successMsg: '信息提交成功',
            errMsg: null,
            reqErrMsg : '请检查网络或联系管理员...',
            stayTime : 1200,
            confirm: true
        }, o || {});

        var ajaxLoading = null;
        if (o.confirm) {
            $.sobox.confirm("提示", o.msg, function() {
                ajaxEvent();
            });
        } else {
            ajaxEvent();
        }

        function ajaxEvent() {
            $.ajax({
                url: o.url,
                type: o.type,
                beforeSend: function(jqXHR, settings) {
                    ajaxLoading = $.sobox.loading({
                        cls: 'so-ajaxLoading',
                        width: 160,
                        content: '提交中，请稍候...'
                    });
                    //显示"操作中"提示
                },
                complete: function(jqXHR, textStatus) {
                    //根据textStatus修改提示
                    //2秒后去掉提示
                },
                data: o.data,
                dataType: 'json',
                success: function(rst) {
                    if (rst) {
                        ajaxLoading.close();
                        if (rst.success) {
                            ajaxLoading = $.sobox.loading({
                                cls: 'so-ajaxSuccess',
                                width: 143,
                                maskClick: true,
                                content: o.successMsg,
                                stayTime: o.stayTime
                            });
                        } else { //失败状态
                            var rstMsg = o.errMsg || rst.message;
                            //stayTime=-1;
                            $.sobox.pop({
                                cls: 'so-popError',
                                title: '错误提示',
                                width: 360,
                                showTitle: false,
                                content: '<p class="p-popError">对不起，提交数据失败！</p>' + rstMsg,
                                btn: [{
                                    text: '确定'
                                }]
                            });
                        }
                        //提示操作成功
                        if (o.success) {
                            o.success(rst);
                        };
                    }

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    ajaxLoading.close();
                    $.sobox.pop({
                        cls: 'so-popError',
                        title: '错误提示',
                        width: 360,
                        showTitle: false,
                        content: '<p class="p-popError">对不起，提交数据失败！</p>'+o.reqErrMsg,
                        btn: [{
                            text: '确定'
                        }]
                    });
                }
            });
        }
    },
    tDom : function (string) {
        return $(top.window.document).find(string);
    },
    tIframe : function (argument) {
        // body...
    },
    arrHasVal: function(arr, val) {
        var l = arr.length;
        for (i = 0; i < l; i++) {
            if (arr[i] === val) {
                return i;
            }
        }
        return -1;
    },
    getFullDate: function(date, type) { // Date,'long/short'
        var that = this;
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hh = date.getHours(); // 时
        var mm = date.getMinutes(); // 分
        var ss = date.getSeconds(); //秒

        month = returnD(month);
        day = returnD(day);
        hh = returnD(hh);
        mm = returnD(mm);
        ss = returnD(ss);
        if (type == 'short') {
            //return year+'-'+month+'-'+day;
            return month + '-' + day + ' ' + hh + ':' + mm + ':' + ss;
        } else if (type == 'long') {
            return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ":" + ss;
        } else {
            return year + '-' + month + '-' + day + ' ' + hh + ':' + mm;
        }

        function returnD(n) { // 小于10，+"0"
            var n = n;
            if (n < 10) {
                n = '0' + n;
            }
            return n;
        }
    },
    getTimeLong: function(s) {
        var h = Math.floor(s / 3600);
        h = h > 9 ? h : ('0' + h);
        var m = Math.floor(s % 3600 / 60);
        m = m > 9 ? m : ('0' + m);
        var s = Math.floor(s % 3600 % 60);
        s = s > 9 ? s : ('0' + s);
        return h == 0 ? (m + ':' + s) : (h + ':' + m + ':' + s);
    },
    format: function(tpl, params) {
        if (arguments.length > 2 && params.constructor != Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor == String || params.constructor == Number) {
            params = [params];
        }

        function _replace(m, word) {
            var rst;
            if (Boolean(word.match(/^[0-9]+$/)) && params.constructor == Array) {
                rst = params[word * 1];
            } else {
                rst = params[word];
            }
            return rst === undefined || rst === null ? "" : rst;
        }
        return tpl.replace(/#?\{([A-Za-z_0-9]+)\}/g, _replace);
    },
    winW: $(window).width(),
    winH: $(window).height()
});



/* 工具方法$T */
var $T = {
    isIE: navigator.userAgent.indexOf('MSIE') > -1,
    color: ['#e51400', '#f8a31f', '#339933', '#a05000', '#368ee0', '#8cbf26', '#00aba9', '#ff0097', '#e671b8', '#a200ff', '#204e81', '#666666', '#2c5e7b', '#56af45'],
    updateWinWH: function() {
        var that = this;
        $(window).resize(function() {
            $.winW = $(window).width();
            $.winH = $(window).height();
            //window.console && console.log('w : '+that.winW+' , h : '+that.winH);
        });
    },
    data: function(el, attrName) {
        attrName = attrName || 'data-opt';
        var data = "{}";
        var m = /({.*})/.exec($(el).attr(attrName));
        if (m)
            data = m[1];
        if (data.indexOf('{') < 0)
            data = "{" + data + "}";
        data = eval("(" + data + ")");
        return data;
    },
    unique: function(array) { //数组去重复
        for (var i = 0; i < array.length; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[j] === array[i]) {
                    array.splice(j, 1);
                    j--;
                }
            }
        }
    },
    goTo: function(url) {
        try {
            $('<a href="' + url + '"></a>').appendTo($('body')).get(0).click();
        } catch (e) {
            window.location.href = url;
        }
    },
    getCookie: function(key, co) {
        var co = co || 'x_x_' + YMG.baseInfo.username || 'YMG',
            $co = $.cookie(co);
        // window.console && console.log('cooke中 '+co+'值为 " '+$co + ' "');
        if ($co !== null) {
            var coArr = $co.split('||');
            var coLen = coArr.length;
            for (i = 0; i < coLen; i++) {
                var vk = coArr[i].split(':=');
                if (vk[0] === key) {
                    //window.console && console.log(key +' = '+ vk[1]);
                    return vk[1];
                }
            }
        } else {
            return null;
        }
    },
    setCookie: function(key, value, co, root) {
        root = root == undefined ? true : root;
        var co = co || 'x_x_' + YMG.baseInfo.username || 'YMG',
            $co = $.cookie(co);
        var coVal;
        if ($co !== null) {
            if ($co.indexOf(key) > -1) {
                var coArr = $co.split('||');
                var coLen = coArr.length;
                for (i = 0; i < coLen; i++) {
                    var vk = coArr[i].split(':=');
                    if (vk[0] === key) {
                        coArr[i] = key + ':=' + value;
                    }
                }
                coVal = coArr.join('||');
            } else {
                coVal = $co + '||' + key + ':=' + value;
            }
        } else {
            coVal = key + ':=' + value;
        }
        if (root) {
            $.cookie(co, coVal, {
                path: '/'
            });
        } else {
            $.cookie(co, coVal);
        }
        window.console && console.log('cooke中 ' + co + '更新为 " ' + $.cookie(co) + ' " ');
    },
    timePop: {
        pop: null,
        timer: null
    }, // 暂存tip的sobox和timer信息
    popTip: function(opt) {
        var that = this;
        var o = $.extend({
            tips: [], //[{content:'警示信息！'(,{type:'normal'})] (type :warning||normal||grey||success||on||off)
            width: 330,
            watingTime: 5000,
            wating: false, //占住pop时间，漏掉pop时的其他提示
            onPop: function() {},
            closePop: function() {},
            playType: null //'normal||alarm||clock||message||message2||on||off'
        }, opt || {});
        window.console && console.log(opt);
        var contentHtml = '';
        $.each(o.tips, function(i, v) {
            var type = v.type || 'normal';
            contentHtml += '<p class="p-popTip p-popTip-' + type + '">' + v.content + '</p>'; // 循环添加所有提示项
        });
        if ($('#pop-onlyTopTip').length) { // 如果tip窗已存在
            clearTimeout(that.timePop.timer);
            if (!o.wating) {
                $('#pop-onlyTopTip').append(contentHtml);
            }
        } else { // 如果tip窗不存在
            that.timePop.pop = $.sobox.tip({
                cls: 'so-popTip-1',
                width: o.width,
                stayTime: 0, // 默认停留5s，小于等于0时不自动关闭
                offset: [-50, -100],
                content: '<div id="pop-onlyTopTip">' + contentHtml + '</div>',
                onPop: function($wrap) {
                    setTimeout(function() {
                        $wrap.animate({
                            top: '18px'
                        }, 300); // 移动显示
                    }, 100);
                    o.onPop();
                    o.playType && that.playVoice.replay(o.playType); //播放声音
                },
                closePop: function() {
                    that.timePop.timer && clearTimeout(that.timePop.timer);
                    o.closePop();
                }
            });
        }
        that.timePop.timer = setTimeout(function() { // 自动清除
            that.timePop.pop.removePop();
        }, o.watingTime);
    },
    showDate : function (obj) {
        $(obj).click(function(){
        //window.console && console.log(this);
            var data = $T.data(obj)||{};
            data = $.extend({dateFmt:'yyyy-MM-dd',readOnly:true},data);
            //window.console && console.log(data);
            WdatePicker(data);
        });
    },
    setNumVal : function (obj,max,min) {
        var num = $(obj).val();
        var  min = (min!==undefined&&min!==null)?min:1;
        num = num.replace(/\D/g,'');
        num = (isNaN(num) ? min : num) * 1;
        num = num<min?min:num;
        if(max){num = num>max?max:num};
        $(obj).val(num);
    },
    openInTopTab : function (obj) {
        var title = $(obj).attr('title');
        var href = $(obj).attr('href');
        var $topAWin = $(top.window.document).find('#s-iframeToWin');
        $topAWin.text(title).attr('href',href);
        $topAWin.trigger('click');
    },
    gridExpandAutoH : function ($tab,rowIndex,gridAutoH) {//修复extend侧边展开行高度不自动的bug

        var $view = $tab.parents('.datagrid-view');
        var $body = $tab.parents('.datagrid-body');
            window.console && console.log($view.height(),$body.height());
        setTimeout(function  () {
            var tabH = $tab.height()+5;
            var $view = $tab.parents('.datagrid-view');
            var $body = $tab.parents('.datagrid-body');
            var $view1 = $tab.parents('.datagrid-view2').prev();
            var index = (rowIndex+1)*2-1;
            $tr = $view1.find('.datagrid-btable').find('tr').eq(index);
            $tr.height(tabH);
            if(gridAutoH){
                // $tab.parents('.datagrid-view').height('auto');
                // $tab.parents('.datagrid-body').height('auto');
            }
        },10);
    },
    gridRefresh : function(grid) {//刷新grid
        var grid = grid || '#dataListGrid';
        $(grid).datagrid('reload');
    },
    gridSearchReload : function(form,grid) {//搜索重新加载grid
        var grid = grid || '#dataListGrid';
        var searchData = $(form).serializeObject();
        $(grid).datagrid('load',searchData);
    },
    gridSearchAndMoreReload : function(form,grid) {//搜索重新加载grid
        var grid = grid || '#dataListGrid';
        var searchData = $(form).serializeObject();
        var serrchMoreData = {};
        if($('.searchListMore').hasClass('in')){
            serrchMoreData =  $('.form-listMoreSearch').serializeObject();
        }
        searchData = $.extend(searchData,serrchMoreData);
        window.console && console.log(searchData);
        $(grid).datagrid('load',searchData);
    },
    gridSearchAndMoreEvent : function(opt) {//搜索+更多搜索重新加载grid
        var o =$.extend({
            layoutBoxId : '#mainLayoutBox',
            grid : '#dataListGrid',
            searchForm : '.form-search',
            searchMoreForm : '.form-listMoreSearch',
            searchBtn : '.btn-gridListSearch',
            searchMoreBtn : '.btn-showMoreSearch',
            searchMoreId : '#searchmoreCont',
            moreSearchHeight : 82
        },opt||{});
        var $layoutBox = $(o.layoutBoxId);
        var $searchMore = $(o.searchMoreId);
        if($searchMore.length){//如果存在更多搜索内容
            $(o.searchMoreBtn).click(function() {
                if ($(this).hasClass('intendSearch')) {//如果处于展开状态
                    $('body').append($searchMore.addClass('none'));
                    $layoutBox.layout("remove","north");
                    $(this).removeClass('intendSearch');
                }else{//处于收缩状态
                    $(this).addClass('intendSearch');
                    $layoutBox.layout("add",{
                        id : 'moreNorthSLayout',
                        region : "north",
                        height : o.moreSearchHeight
                    });
                    $layoutBox.find('#moreNorthSLayout').append($searchMore.removeClass('none'));
                };
            });
        }

        $(o.searchBtn).click(function () {//提交搜索
            var searchData = $(o.searchForm).serializeObject();
            var searchMoreData = {};
            if($layoutBox.find(o.searchMoreId).length){
                searchMoreData =  $(o.searchMoreForm).serializeObject();
            }
            searchData = $.extend(searchData,searchMoreData);
            window.console && console.log(searchData);
            $(o.grid).datagrid('load',searchData);
        });
    }
};

var hk ={
    pop : function () {
        if ($('.hk-pop').length) {
            $('.hk-pop').prop('readonly',true).click(function() {
                var opt = $(this).data('opt');
                window.console && console.log(opt);
            });
        };
    }
}

var regionRender = {
    renderDropDistinct : function (newAdd) {//订单页
        var t = this;
        if ($('.drop-province').length) {
            //初始化
            newAdd&&t.provinceInit();
            // change province
            $('.drop-province').change(function () {
                t.changeProvince(this.value);
            });
            // change city
            $('.drop-city').change(function () {
                var districtData = t.addOptHtml(region.data.district,this.value);
                $('.drop-distinct').html(districtData.html);
                $('#city').val($('.drop-city option:selected').text());
                $('#district').val($('.drop-distinct option:selected').text());
            });
            // change distinct
            $('.drop-distinct').change(function () {
                $('#district').val($('.drop-distinct option:selected').text());
                //$zip.text(this.value);
            });
        };

    },
    provinceInit : function (v1,v2,v3) {
        var t = this;
        var provinceHtml = '';
        for (i in region.data.province) {
            var d = region.data.province[i];
            provinceHtml += '<option value="'+d.id+'">'+d.name+'</option>';
        }
        $('.drop-province').html(provinceHtml);
        var v1 = v1||$('.drop-province option:first').val();
        $('.drop-province').val(v1);
        t.changeProvince(v1,v2,v3);

    },
    addOptHtml : function (data,val) {
        var arr = data[val];
        var h = '';
        var aLen = arr.length;
        for (i = 0; i < aLen; i++) {
            h += '<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
        }
        return {html:h,arr:arr};
    },
    changeProvince : function (v1,v2,v3) {
        var t = this;
        //var $zip = $('.b-zipcode');
        var cityData = t.addOptHtml(region.data.city,v1);
        $('.drop-city').html(cityData.html);
        $('.drop-city').val(v2);
        var disParId = v2||cityData.arr[0].id;
        var districtData = t.addOptHtml(region.data.district,disParId);
        $('.drop-distinct').html(districtData.html);
        if (v3) {$('.drop-distinct').val(v3);}
          //$zip.text(v3||$('.drop-distinct option:first').val());
        $('#province').val($('.drop-province option:selected').text());
        $('#city').val($('.drop-city option:selected').text());
        $('#district').val($('.drop-distinct option:selected').text());
    }

};


var myview = $.extend({},$.fn.datagrid.defaults.view,{
    onAfterRender:function(target){
        $.fn.datagrid.defaults.view.onAfterRender.call(this,target);
        var opts = $(target).datagrid('options');
        var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
        vc.children('div.datagrid-empty').remove();
        var gridBodyH = vc.find('div.datagrid-body').height();
        if (!$(target).datagrid('getRows').length){
            var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
            d.css({
                position:'absolute',
                left:0,
                top:36,
                width:'100%',
                height:gridBodyH,
                textAlign:'center',
                backgroundColor:'#fafafa',
                lineHeight:'120px',
                color:'#999999',
                fontSize: '2em'
            });
        }
    }
    });