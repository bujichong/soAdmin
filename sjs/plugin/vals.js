$.fn.extend({
			/**
	 * 取ID范围内所有值 $('#id').vals(空或true) -->{xx:yy} $('#id').vals(flase)
	 * -->xx=yy 赋值 $('#id').vals({xx:yy})
	 */
	vals : function(param) {
		if (typeof (param) == 'boolean' || param === undefined) {
			var c = {};// 暂存checkbox,选中的值用逗号隔开
			this.each(function() {
				if(/input/i.test(this.tagName)){
					var key = this.name || this.id;
					if (/checkbox/i.test(this.type)) {
						var val = this.checked ? (this.value || 'on') : '';
						if(val!=''){
							if (c[key]) {
								c[key] = c[key] + "," + val;
							} else {
								c[key] = val;
							}
						}
					} else if (/radio/i.test(this.type)) {
						if (this.checked){
							c[key] = $.trim($(this).val());
						}
					} else {
						c[key] = $.trim($(this).val());
					}
				} else if (/select/i.test(this.tagName)) {
					var key = this.name || this.id;
					c[key] = $.trim($(this).val()) + "";
				} else if ($(this).has(":input").length) {
					var sub = $(":input", this).vals();
					$.extend(c, sub);
				} else {
					var key = this.name || this.id;
					c[key] = $.trim($(this).val());
				}
				//console.timeEnd(xx);
			});
			return param !== false ? c : $.param(c);
		} else if (typeof (param) == 'object') {
			this.each(function() {
				if (/div|span|table|form|ul|li/i.test(this.tagName)) {
					$(":input,label,b", this).vals(param);
				} else {
					var nm = this.name || this.id;
					if(nm){
						var vl    = param[nm],
					      arr  = nm.match(/(\w*)\[(\d*)\]/),
					      obj  = nm.match(/(\w*)\.(\w*)/);
					if(arr&&arr.length==3){
						vl=param[arr[1]][arr[2]];
					}
					if(obj&&obj.length==3){
						vl=param[arr[1]][arr[2]];
					}
					if (vl !== undefined && vl !== null) {
						if (/label|b/i.test(this.tagName)) {
							$(this).text(vl);
						}else if(/checkbox/i.test(this.type)){
							if(vl===true) {
								$(this).attr("checked","checked");
							}else{
								$(this).removeAttr("checked");
							}
						}else if(/radio/i.test(this.type)){
							if(vl===true){
								if($(this).val()==='true'||$(this).val()==='1'){
									$(this).attr("checked","checked");
								}
							}else{
								if($(this).val()==='false'||$(this).val()==='0'){
									$(this).attr("checked","checked");
								}
							}
						}else  {
							$(this).val(vl);
						}
					}
					}
				}
			});
		}
	},
	clear : function(data) {
		$(":input:not(:submit)", this).val("");
		if (data)
			$(this).vals(data);
	}
});