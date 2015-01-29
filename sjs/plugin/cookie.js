//jQuery.cookie
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//扩展将要保存的数据放在一个cookie对象中，而不是不断新建cookie项
jQuery.extend({
	//jQuery.getCookie
	getCookie : function (key,co) {
		var co = co||'sopro',$co = $.cookie(co);
		// window.console && console.log('cooke中 '+co+'值为 " '+$co + ' "');
		if ($co!==null) {
			var coArr = $co.split('||');
			var coLen = coArr.length;
			for (i = 0; i < coLen; i++) {
				var vk = coArr[i].split(':=');
				if (vk[0] === key) {
					//window.console && console.log(key +' = '+ vk[1]);
					return vk[1];
				}
			}
		}else {
			return null;
		}
	},
	//jQuery.setCookie
	setCookie : function (key,value,co,root) {
		root = root==undefined?true:root;
		var co = co||'sopro',$co = $.cookie(co);
		var coVal;
		if ($co!==null) {
			if ($co.indexOf(key)>-1) {
				var coArr = $co.split('||');
				var coLen = coArr.length;
				for (i = 0; i < coLen; i++) {
					var vk = coArr[i].split(':=');
					if (vk[0] === key) {
						coArr[i] = key+':='+value;
					}
				}
				coVal = coArr.join('||');
			}else {
				coVal = $co+'||'+key+':='+value;
			}
		}else {
			coVal = key+':='+value;
		}
		if (root) {
			$.cookie(co,coVal,{ path: '/'});
		}else {
			$.cookie(co,coVal);
		}
		window.console && console.log('cooke中 '+co+'更新为 " '+$.cookie(co)+' " ');
	}
});
