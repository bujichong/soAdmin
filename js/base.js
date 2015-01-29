(function () {
	//jQuery.cookie
	jQuery.cookie=function(a,b,c){var d,e,f,g,h,i,j,k,l;if("undefined"==typeof b){if(i=null,document.cookie&&""!=document.cookie)for(j=document.cookie.split(";"),k=0;k<j.length;k++)if(l=jQuery.trim(j[k]),l.substring(0,a.length+1)==a+"="){i=decodeURIComponent(l.substring(a.length+1));break}return i}c=c||{},null===b&&(b="",c.expires=-1),d="",c.expires&&("number"==typeof c.expires||c.expires.toUTCString)&&("number"==typeof c.expires?(e=new Date,e.setTime(e.getTime()+1e3*60*60*24*c.expires)):e=c.expires,d="; expires="+e.toUTCString()),f=c.path?"; path="+c.path:"",g=c.domain?"; domain="+c.domain:"",h=c.secure?"; secure":"",document.cookie=[a,"=",encodeURIComponent(b),d,f,g,h].join("")};
	/* hoverClass */
	$.fn.hoverClass=function(a,b,c){var d=this;return d.each(function(e){d.eq(e).mouseenter(function(){$(this).addClass(a),b&&b(this)}),d.eq(e).mouseleave(function(){$(this).removeClass(a),c&&c(this)})}),d};
	/* textFocus */
	$.fn.textFocus=function(a){var b,c;return a=$.extend({val:null,focusCls:"txt-focus",changeCls:"txt-change",keyback:function(){}},a||{}),b=a.focusCls,c=a.changeCls,this.each(function(){var d=$(this),e=null==a.val?$(d).val():a.val;d.val(e),d.focus(function(){d.val()==e&&d.val(""),b&&d.addClass(b)}),d.blur(function(){""==d.val()&&d.val(e),b&&d.removeClass(b)}),c&&d.keyup(function(){d.val()!=e&&""!=d.val()?d.addClass(c):d.removeClass(c),a.keyback(d)})}),this};
	$.fn.openSelVal = function (target) {
		var _self = this;
		_self.change(function(){
			if (_self.val()!=0) {
				if (target =='self'){
				window.location=_self.val();
			}else{window.open(_self.val());}
			}
		});
	return _self;
	};
})(jQuery);

/* soScrollTo */
jQuery.extend(jQuery.easing,{easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c}}),function(a){a.fn.soScrollTo=function(b){var c;b=a.extend({direction:"y",speed:800,easeType:"easeInOutExpo",dis:0},b||{}),c=a(this),c.click(function(){var d,c=a(this).attr("href");return c=a("#"!=c?c:"body"),c.length&&(d={t:(c.offset().top+b.dis)||0,l:(c.offset().left+b.dis)||0},"x"==b.direction?a("html,body").stop().animate({scrollLeft:d.l},b.speed,b.easeType):a("html,body").stop().animate({scrollTop:d.t},b.speed,b.easeType)),!1})}}(jQuery);

/* soLazy */
(function(a){a.fn.extend({soLazy:function(h){h=a.extend({type:"scroll",imgTag:"src2",defHeight:40,defDelay:4000},h||{});var b=a(this);var d=b.find("img"),f=h.imgTag;if(h.type=="scroll"){var c=function(){return document.documentElement.clientHeight+Math.max(document.documentElement.scrollTop,document.body.scrollTop)-h.defHeight};var g=function(){d.each(function(){if(a(this).offset().top<=c()){var i=a(this).attr(f);if(i){a(this).attr("src",i).removeAttr(f)}}})};g();a(window).bind("scroll",function(){g()})}if(h.type=="delay"){var e=setTimeout(function(){d.each(function(){var i=a(this).attr(f);if(i){a(this).attr("src",i).removeAttr(f)}})},h.defDelay)}return b}})})(jQuery);

/* soChange 1.6.2 - simple object change with jQuery */
(function(a){a.fn.extend({soChange:function(b){b=a.extend({thumbObj:null,btnPrev:null,btnNext:null,changeType:"fade",thumbNowClass:"now",thumbOverEvent:true,slideTime:1000,autoChange:true,clickFalse:true,overStop:true,changeTime:5000,delayTime:300,callback:function(){}},b||{});var h=a(this);var i;var k=h.size();var e=0;var g;var c;var f;function d(){if(e!=g){if(b.thumbObj){a(b.thumbObj).removeClass(b.thumbNowClass).eq(g).addClass(b.thumbNowClass)}if(b.slideTime<=0){h.eq(e).hide();h.eq(g).show()}else{if(b.changeType=="fade"){h.eq(e).fadeOut(b.slideTime);h.eq(g).fadeIn(b.slideTime)}else{h.eq(e).slideUp(b.slideTime);h.eq(g).slideDown(b.slideTime)}}if(b.callback){b.callback(e,g)}e=g}}function j(){g=(e+1)%k;d()}h.hide().eq(0).show();if(b.thumbObj){i=a(b.thumbObj);i.removeClass(b.thumbNowClass).eq(0).addClass(b.thumbNowClass);i.click(function(){g=i.index(a(this));d();if(b.clickFalse){return false}});if(b.thumbOverEvent){i.hover(function(){g=i.index(a(this));f=setTimeout(d,b.delayTime)},function(){clearTimeout(f)})}}if(b.btnNext){a(b.btnNext).click(function(){if(h.queue().length<1){j()}return false})}if(b.btnPrev){a(b.btnPrev).click(function(){if(h.queue().length<1){g=(e+k-1)%k;d()}return false})}if(b.autoChange){c=setInterval(j,b.changeTime);if(b.overStop){h.hover(function(){clearInterval(c)},function(){c=setInterval(j,b.changeTime)})}}}})})(jQuery);


/* sobox 2.0 */
!function(a,b){a.sobox={maskIndex:0,showMask:function(c){var e,f,g,d=this;return c?(e=a(".so-openmask"),e.length?d.maskIndex++:(e=a('<div class="so-openmask"></div>'),a("body").append(e),d.maskIndex=1),f="undefined"==typeof b.body.style.maxHeight?b:window,g=a(f).height()-18,e.height(c?g+20:0),a(window).resize(function(){var b=a(f).height()-18;e.height(c?b+20:0)}),e.css("z-index",1e3+10*d.maskIndex)):e=null,e},show:function(b,c,d){var e=this,f=a(b.obj),g=e.showMask(c);return e.setPos(b),b.onlyOne&&a("body").data("soonlyone",!0),f.css("z-index",1002+10*e.maskIndex).fadeIn(),f.find(".s-close").bind("click",function(){e.hide(f)}),d&&d(),g},hide:function(b,c,d){var e=this,f=a(".so-openmask");a(b).fadeOut("fast",function(){a("select").show(),d&&d()}),c&&(e.maskIndex--,f.css("z-index",1e3+10*e.maskIndex),0==e.maskIndex&&f.remove()),a(b).find(".s-close").unbind("click")},drag:function(c,d){function g(a){null==a&&(a=window.event),e.css({opacity:"0.4",left:a.clientX-posX+"px",top:a.clientY-posY+"px"})}var e=a(c),f=a(d);f.mousedown(function(c){c||(c=window.event),posX=c.clientX-parseInt(e.css("left")),posY=c.clientY-parseInt(e.css("top")),a(b).bind("mousemove.drag",function(a){g(a)})}),a(b).mouseup(function(c){c.target==f.get(0)&&(a(b).unbind("mousemove.drag"),e.css({opacity:"1"}))})},setPos:function(c){var e,f,g,h,i,j,k,l,m,n;switch(c=a.extend({mode:"center",obj:null,pos:[0,0],offset:[0,0]},c),e=a(c.obj),f=Math.floor(e.height()/2),g=Math.floor(e.width()/2),h=a(window).scrollTop(),i=a(window).height(),j=c.pos[0],k=c.pos[1],l=c.offset[0],m=c.offset[1],e.css({position:"fixed"}),"undefined"==typeof b.body.style.maxHeight&&(n=e.find("select"),a("select").not(n).hide()),c.mode){case"win":e.css({left:j+l,top:k+m}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+k+m});break;case"doc":e.css({position:"absolute",left:j+l,top:k+m});break;case"tc":e.css({left:"50%",top:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m});break;case"bc":e.css({left:"50%",bottom:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m+i});break;default:e.css({top:"50%",left:"50%",marginTop:-f-10+m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+i/2})}},pop:function(b){function j(i){var j,l,m;b=a.extend(b,i||{}),b.showTitle&&e.append(f),b.outCloseBtn&&g.addClass("s-sopop-out-close"),e.append(g).append(h),b.height&&"iframe"!=b.type&&e.css("height",b.height+"px"),e.css({visibility:b.visibility?"visible":"hidden"}),"content"==b.type&&h.html(b.content),"target"==b.type&&(j=a(b.target).show(),h.append(j)),"iframe"==b.type&&(l=a('<iframe id="'+b.iframeID+'" name="'+b.iframeID+'" src="'+b.iframe+'" width="100%" height="'+b.height+'" frameborder="0" scrolling="auto"></iframe>'),h.html(l)),"ajax"==b.type&&h.load(b.ajax.url,b.ajax.data,function(){c.setPos({mode:b.posType,obj:e,pos:b.pos,offset:b.offset}),b.ajax.callback&&b.ajax.callback()}),b.btn.length>0&&(m=a('<p class="p-so-popBtn"></p>'),a.each(b.btn,function(){var b=a.extend({cls:null,text:"确定",link:"#",removePop:!0,callback:function(){}},this),c=a('<a class="a-sopop-btn" href="'+b.link+'"><span class="s-sopop-btn">'+b.text+"</span></a>");null!==b.cls&&c.addClass(b.cls),c.bind("click",function(){return b.callback&&b.callback(k),b.removePop&&k(),"#"===b.link?!1:!0}),m.append(c)}),e.append(m)),a("body").append(e),b.showTitle&&b.drag&&(f.addClass("h2-sopop-move"),c.drag(e,f)),b.beforePop(e,f,g,h),d=c.show({mode:b.posType,obj:e,pos:b.pos,offset:b.offset,onlyOne:b.onlyOne},b.showMask,b.onPop(e)),g.bind("click",function(){k()}),d&&b.maskClick&&d.bind("click",function(){k()})}function k(d){b=a.extend(b,d||{}),c.hide(e,b.showMask),a("body").removeData("soonlyone"),null!=b.target&&a(b.target).appendTo("body").hide(),e.remove(),b.closePop()}var d,e,f,g,h,i,c=this;return b=a.extend({type:"content",target:null,content:null,iframe:null,iframeID:"sopop-iframe",ajax:{url:null,data:null,callback:function(){}},posType:"center",pos:[0,0],offset:[0,0],cls:null,width:400,height:null,defaultShow:!0,visibility:!0,title:"提示",showTitle:!0,outCloseBtn:!1,showMask:!0,onlyOne:!1,drag:!0,maskClick:!0,btn:[],beforePop:function(){},onPop:function(){},closePop:function(){}},b||{}),e=a('<div class="so-popbox '+(b.cls?b.cls:"")+'" style="width:'+b.width+'px;display:none;"></div>'),f=a('<h2 class="h2-sopop"><span class="s-sopop-title">'+b.title+"</span></h2>"),g=a('<span class="s-sopop-close">[关闭]</span>'),h=a('<div class="so-popbox-cont"></div>'),i=a("body").data("soonlyone"),b.defaultShow&&!i&&j(),{wrap:e,mask:d,opt:b,removePop:k,showPop:j}},alert:function(a,b,c){var d=this;d.pop({cls:"so-popAlert",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}}]})},confirm:function(a,b,c,d){var e=this;e.pop({cls:"so-popConfirm",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}},{text:"取消",cls:"a-sopop-cancel",callback:function(){d&&d()}}]})},tip:function(b){var e,c=this,d=null;return b=a.extend({cls:"so-popTip",showTitle:!1,posType:"tc",showMask:!1,width:250,stayTime:5e3,offset:[0,5],closePop:function(){d&&clearTimeout(d)}},b||{}),e=c.pop(b),b.stayTime>0&&(d=setTimeout(function(){e.removePop()},b.stayTime)),e},loading:function(b){var d,c=this;return b=a.extend({type:"content",cls:"so-loading",showTitle:!1,maskClick:!1,width:80,height:36,content:"",stayTime:0},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime),{open:d.showPop,close:d.removePop}}},a.fn.soIframePop=function(b){var c=a.extend({type:"iframe",targetTag:"href",splitString:"#soIframe?",width:800,height:480,showTitle:!1},b||{}),d=[];return this.each(function(){var g,h,b=a(this),e=b.attr(c.targetTag).split(c.splitString),f=e[0];par=e[1]?e[1].split("&"):"",g={},a.each(par,function(){var a=this.split("=");g[a[0]]=a[1]}),c=a.extend(c,g||{}),c.showTitle="true"==c.showTitle?1:+c.showTitle,c.iframe=f,c.defaultShow=!1,h=a.sobox.pop(c),d.push(h),b.click(function(){return h.showPop(),a(this).data("iframePop",h),!1})}),d},a.fn.soSidePop=function(b){var c=a(this),d=b.event||"click",e=null;return c.bind(d,function(c){var d=a(this).offset(),f="mouse"==b.por?[c.pageX,c.pageY]:[d.left,d.top],g=a.extend({showMask:!1,posType:"doc",por:"mouse",pos:f,offset:[10,10],onlyOne:!0,returnFalse:!0},b||{});return e=a.sobox.pop(g),g.returnFalse?!1:void 0}),"mouseover"==d&&c.bind("mouseout",function(){e.removePop()}),c},a.fn.soOverTip=function(b){var c=a(this),d=a.extend({cls:"so-overTip",showMask:!1,posType:"doc",offset:[10,10],showTitle:!1,onlyOne:!0},b||{}),e=null;return c.mouseenter(function(b){d.pos=[b.pageX,b.pageY],e=a.sobox.pop(d)}).mouseleave(function(){e.removePop()}),c}}(jQuery,document);

/* vals  clearForm */
$.fn.extend({vals:function(a){if("boolean"==typeof a||void 0===a){var b={};return this.each(function(){var a,c,d;/input/i.test(this.tagName)?(a=this.name||this.id,/checkbox/i.test(this.type)?(c=this.checked?this.value||"on":"",""!=c&&(b[a]=b[a]?b[a]+","+c:c)):/radio/i.test(this.type)?this.checked&&(b[a]=$.trim($(this).val())):b[a]=$.trim($(this).val())):/select/i.test(this.tagName)?(a=this.name||this.id,b[a]=$.trim($(this).val())+""):$(this).has(":input").length?(d=$(":input",this).vals(),$.extend(b,d)):(a=this.name||this.id,b[a]=$.trim($(this).val()))}),a!==!1?b:$.param(b)}"object"==typeof a&&this.each(function(){var b,c,d,e;/div|span|table|form|ul|li/i.test(this.tagName)?$(":input,label,b",this).vals(a):(b=this.name||this.id,b&&(c=a[b],d=b.match(/(\w*)\[(\d*)\]/),e=b.match(/(\w*)\.(\w*)/),d&&3==d.length&&(c=a[d[1]][d[2]]),e&&3==e.length&&(c=a[d[1]][d[2]]),void 0!==c&&null!==c&&(/label|b/i.test(this.tagName)?$(this).text(c):/checkbox/i.test(this.type)?c===!0?$(this).attr("checked","checked"):$(this).removeAttr("checked"):/radio/i.test(this.type)?c===!0?("true"===$(this).val()||"1"===$(this).val())&&$(this).attr("checked","checked"):("false"===$(this).val()||"0"===$(this).val())&&$(this).attr("checked","checked"):$(this).val(c))))})},clearForm:function(a){$(":input:not(:submit)",this).val(""),a&&$(this).vals(a),$(".txt-err",this).removeClass("txt-err"),$(".em-errMes").remove()}});

/* soTree */
!function(a){a.fn.extend({soTree:function(b){var c,d,e,f,g,h,i,j,l,m;return b=a.extend({type:"json",data:null,style:"html",id:null,cls:null,url:null,rootId:"0",rootText:"根节点",rootHide:!1,rootExpand:!0,slide:!1,expand:!0,liExtendHtml:"",checkbox:!1,checked:!1,dataSet:!0,hideId:[],collapsePar:[],expandPar:[],onSuccess:function(){},onStepSuccess:function(){},onRenderAfter:function(){},onChecked:function(){},onCancelChecked:function(){},onCheck:function(){},onExpand:function(){},onCollapse:function(){},onSelect:function(){},onClick:function(){}},b||{}),c=a(this),d=b.url,e=b.id||"ul_soTree_"+Math.floor(1e13*Math.random()),f={afterLoadData:function(c,d){var h,i,f=this,g=a("li",c);g.data("isleaf",!0),h=a("li",c).filter(function(){return a("ul",this).length||0==a(this).data("leaf")}),h.addClass("li_par").data("isexpand",!0).data("isleaf",!1).data("incomplete",!1),a("li.li_par>.em_op",c).addClass("em_par"),a("li.li_par>.span_t",c).addClass("span_par"),"stepJson"!=b.type&&a("li:last",c).addClass("li_last"),a("ul",c).each(function(){a(this).find("li:last").addClass("li_last"),a(">li:last",this).hasClass("li_par")&&(a(">li:last",this).addClass("li_parLast"),a(">li:last>ul",this).addClass("ul_chiLast"))}),a(".em_par",c).bind("click",function(){var c=a(this).parent();a(this).hasClass("em_in")?(c.data("isexpand",!0),a(this).removeClass("em_in").siblings(".span_par").removeClass("span_in").siblings("ul"),b.slide?a(this).siblings("ul").slideDown("fast"):a(this).siblings("ul").show()):(c.data("isexpand",!1),a(this).addClass("em_in").siblings(".span_par").addClass("span_in"),b.slide?a(this).siblings("ul").slideUp("fast"):a(this).siblings("ul").hide())}),a(".span_t",c).bind("click",function(){var b=a(this).parent();g.data("isselected",!1),b.data("isselected",!0),a(".span_t",c).removeClass("span_t_selected"),a(this).addClass("span_t_selected")}),b.expand?b.collapsePar.length&&a.each(b.collapsePar,function(b,d){a("#"+d,c).length&&(a("#"+d,c).data("isexpand",!1),a("#"+d+">.em_par:first",c).addClass("em_in"),a("#"+d+">.span_par:first",c).addClass("span_in"),a("#"+d+">ul",c).hide())}):(a(".em_par",c).addClass("em_in"),a(".span_par",c).addClass("span_in"),a(".li_par",c).data("isexpand",!1),a("ul",c).hide(),b.expandPar.length&&a.each(b.expandPar,function(b,d){a("#"+d,c).length&&(a("#"+d,c).data("isexpand",!0),a("#"+d+">.em_par:first",c).removeClass("em_in"),a("#"+d+">.span_par:first",c).removeClass("span_in"),a("#"+d+">ul",c).show())})),b.checkbox&&(i=a(".b_chk",c),i.css("display","inline"),d&&i.addClass("b_checked"),i.bind("click",function(){var c,b=a(this).parent();a(this).hasClass("b_checked")?(b.data("ischecked",!1),a(this).removeClass("b_incomplete").removeClass("b_checked"),b.find("ul .b_chk").removeClass("b_checked"),b.find("li").data("ischecked",!1)):(b.data("ischecked",!0),a(this).addClass("b_checked"),b.find("ul .b_chk").removeClass("b_incomplete").addClass("b_checked"),b.find("li").data("ischecked",!0)),c=a(this).parents("ul"),f.setUlCheckState(c)})),a(c).click(function(a){var b=b?b:c,d=a.target||a.srcElement;return f.funReturnInfo(d,b),!1})},setUlCheckState:function(b){var d=b?a(b):a("ul",c);d.each(function(){var b=a(this),c=b.find(".b_chk").length,d=b.find(".b_checked").length;c==d?(b.siblings(".b_chk").removeClass("b_incomplete").addClass("b_checked"),b.parent().data("incomplete",!1)):d>0&&c!=d?(b.siblings(".b_chk").removeClass("b_checked").addClass("b_incomplete"),b.parent().data("incomplete",!0)):0==d&&(b.siblings(".b_chk").removeClass("b_checked").removeClass("b_incomplete"),b.parent().data("incomplete",!1))})},funReturnInfo:function(c){var h,i,j,f=a(c),g=f.parent("li");return g=g.length?g:f,h=a.extend({childInfo:null},g.data()||{}),h.isleaf||(i=[],j=a("li",g),h.isexpand=!a(">em.em_par",g).hasClass("em_in"),j.each(function(){i.push(a(this).data())}),h.childInfo=i),f.hasClass("b_chk")&&(h.ischecked?b.onChecked(c,h):b.onCancelChecked(c,h),b.onCheck(c,h)),f.hasClass("span_t")&&b.onSelect(c,h),f.hasClass("em_par")&&(f.hasClass("em_in")?b.onCollapse(c,h):b.onExpand(c,h)),b.onClick(c,h),h},checkAexpend:function(c){var d=this;b.hideId.length>0&&a.each(b.hideId,function(){a("#"+this).hide()}),b.dataSet&&a("li",c).each(function(){"true"==a(this).attr("data-ischecked")?a(".b_chk",this).addClass("b_checked"):a(".b_chk",this).removeClass("b_checked"),"true"==a(this).attr("hide")&&a(this).hide(),"true"==a(this).attr("data-isexpand")?(a(">.em_par",this).removeClass("em_in"),a(">.span_par",this).removeClass("span_in"),a(">ul",this).show()):"false"==a(this).attr("data-isexpand")&&(a(">.em_par",this).addClass("em_in"),a(">.span_par",this).addClass("span_in"),a(">ul",this).hide())}),d.setUlCheckState()},renderByData:function(d){var h,i,j,l,m,n,o,q,r,s,t,u,v,w,x;for(d=d,h=[],i=d.length,j=a('<ul class="ul_tree"></ul>'),j.attr("id",e),b.cls&&j.addClass(b.cls),l=b.checked,b.onSuccess(d),m=0;i>m;m++){n={id:d[m].id,pid:d[m].pid,text:d[m].text,state:d[m].state,isHide:d[m].hide},o="";for(k in d[m])o+="data-"+k+'="'+d[m][k]+'" ';for(o+="data-isselected=false ",a(j).find("li"),q=1,r="",s="",t="",r=n.isHide===!0?' style="display:none;"':"",s="li_"+g[n.state],t="span_"+g[n.state],u=h.length,v=0;u>v;v++)n.pid==h[v]&&(w=h[v],x=j.find("#"+w),x.find(">ul").length?x.find(">ul").append('<li id="'+n.id+'" pid="'+n.pid+'"'+r+o+' class="'+s+'"><em class="em_op"></em><b class="b_chk"></b><span class="span_t '+t+'">'+n.text+"</span>"+b.liExtendHtml+"</li>"):x.append('<ul><li id="'+n.id+'" pid="'+n.pid+'"'+r+o+' class="'+s+'"><em class="em_op"></em><b class="b_chk"></b><span class="span_t '+t+'">'+n.text+"</span>"+b.liExtendHtml+"</li></ul>"),q=0);q&&j.append('<li id="'+n.id+'" pid="'+n.pid+'"'+r+o+' class="'+s+'"><em class="em_op"></em><b class="b_chk"></b><span class="span_t '+t+'">'+n.text+"</span>"+b.liExtendHtml+"</li>"),h.push(d[m].id)}h=null,f.afterLoadData(j,l),"html"==b.style?c.html(j):c.append(j),f.checkAexpend(c),b.onRenderAfter(d)},getNodesData:function(b){var c,d,f;return"string"==typeof b&&(b={node:"checked",justleaf:!0,data:b}),c=a.extend({node:"checked",justleaf:!0,data:"all"},b||{}),d=a("li","#"+e),"all"!=c.node&&(d="selected"==c.node?a(".span_t_selected","#"+e).parent():d.filter(function(){var b=a(">.b_chk",this).hasClass("b_checked");return"unchecked"==c.node?!b:b})),d.length&&c.justleaf&&(d=d.filter(function(){return!a(this).hasClass("li_par")})),f=[],d.length&&d.each(function(){"all"==c.data?f.push(a(this).data()):f.push(a(this).data(c.data))}),f},getNodesDataByAttr:function(b){var d,c=a("#"+e).find("li");return a.each(b,function(b,d){c=c.filter(function(){return a(this).data(b)==d})}),d=[],c.length&&c.each(function(){d.push(a(this).data())}),d},showCheckbox:function(b){var c=a(".b_chk","#"+e);c.css("display",b?"inline":"none")}},g={0:"off",1:"out",2:"stop",3:"runing"},"json"==b.type?b.data?f.renderByData(b.data):a.getJSON(d,function(a){f.renderByData(a)}):"stepJson"==b.type?(b.expand=!1,h=b.checked,b.rootHide?(i=a('<ul class="ul_tree"></ul>'),i.attr("id",e),b.cls&&i.addClass(b.cls),j=a(i)):(i=a('<ul class="ul_tree"></ul>'),l="<li id="+b.rootId+' class="li_par"><em class="em_op em_par"></em><b class="b_chk"></b><span class="span_t span_par">'+b.rootText+"</span><ul></ul></li>",i.append(l),j=a("ul",i)),m=d+"?id="+b.rootId,a.getJSON(m,function(d){var e,g,k,l,m,n;for(d=d,e=d.length,b.onSuccess(d),g=0;e>g;g++)k={id:d[g].id,pid:d[g].pid,text:d[g].text,nodetype:d[g].nodetype,ischecked:d[g].ischecked,isHide:d[g].hide},l=k.nodetype?'class="li_par"':"",m="",n="",k.isHide===!0&&(n=' style="display:none;"'),j.append('<li id="'+k.id+'" pid="'+k.pid+'" '+l+m+n+'><em class="em_op"></em><b class="b_chk"></b><span class="span_t">'+k.text+"</span></li>");f.afterLoadData(i,h),c.append(i),f.checkAexpend(i),!b.rootHide&&b.rootExpand&&(j.show(),a(".em_op:first",i).removeClass("em_in")),a(".em_par",i).live("click",function(){var e,h,j,c=a(this).parent();0==c.find("ul").length&&(e=b.checked,h=i,a(".b_chk:first",c).hasClass("b_checked")&&(e=!0),j=b.url+"?id="+c.attr("id"),a.getJSON(j,function(i){var j,k,l,m,n,o;for(i=i,j=i.length,k=a("<ul></ul>"),b.onStepSuccess(i),g=0;j>g;g++)l={id:i[g].id,pid:i[g].pid,text:i[g].text,nodetype:i[g].nodetype,ischecked:i[g].ischecked,isHide:d[g].hide},m=l.nodetype?' class="li_par"':"",n="",o="",l.ischecked===!0?n=' ischecked="true"':l.ischecked===!1&&(n=' ischecked="false"'),l.isHide===!0&&(o=' style="display:none;"'),k.append('<li id="'+l.id+'" pid="'+l.pid+'"'+m+n+o+'><em class="em_op"></em><b class="b_chk"></b><span class="span_t">'+l.text+"</span></li>");f.afterLoadData(k,e,h),a(k).hide(),c.append(k),f.checkAexpend(k),b.slide?a(k).slideDown("fast"):a(k).show()}))}),b.onRenderAfter(d)})):"html"==b.type&&(a("span",c).length>0?(a("ul",c).addClass("ul_tree"),a("span",c).addClass("span_t").before('<em class="em_op"></em><b class="b_chk"></b>'),f.afterLoadData(a(".ul_tree",c),b.checked),f.checkAexpend(c)):alert("html树结构不正确，参考结构：<ul><li><span>节点1</span></li></ul>")),{getNodesData:f.getNodesData,getNodesDataByAttr:f.getNodesDataByAttr,showCheckbox:f.showCheckbox}},soDropTree:function(b){var b=a.extend({id:null,treeId:null,cls:null,url:null,data:null,treeW:200,treeMaxH:300,offset:[0,25],slide:!0,expand:!1,valOpt:"sid",txtOpt:"text",defaultVal:null,checked:!1,dataSet:!0,multiCheck:!0,onRenderAfter:function(){},onSelect:function(){},onCheck:function(){},onSuccess:function(){},onChecked:function(){},onCancelChecked:function(){},onExpand:function(){},onCollapse:function(){},onClick:function(){}},b||{});a(this).each(function(){function m(){var g,b=l.getNodesData(),d=[],f=[];return b.length&&a.each(b,function(a,b){d.push(b.text),f.push(b.sid)}),g=d.join(","),g=""==g?"请选择...":g,e.text(g).attr("title",g),c.val(f.join(",")),f}var i,j,k,l,c=a(this),d=b.url||c.attr("data-url"),e=a('<span class="s-treeTxt"></span>'),f=b.id||"dropTreeBox_"+Math.floor(1e13*Math.random()),g=a('<div id="'+f+'" class="dropTreeBox" style="width:'+b.treeW+"px;max-height:"+b.treeMaxH+"px;_height:"+b.treeMaxH+'px;"></div>'),h=a('<span class="s-treeClose"></span>');return c.hide().after(e),g.append(h),a("body").append(g),g.hide(),i=b.treeId||"ul_soTree_"+Math.floor(1e13*Math.random()),j=null,(b.data||d)&&(k=b.defaultVal||c.val(),""===k&&e.text("请选择..."),l=g.soTree({id:i,style:"append",cls:b.cls,url:d,data:b.data,checked:b.checked,expand:b.expand,dataSet:b.dataSet,checkbox:b.multiCheck,onRenderAfter:function(c){""!==k&&(window.console&&console.log(k),a("li[data-"+b.valOpt+'="'+k+'"]').find(".span_t").trigger("click")),b.onRenderAfter(c)},onCheck:function(a,c){if(b.multiCheck&&l){var d=m();b.onCheck(a,c,d)}},onSelect:function(d,f){b.multiCheck?a(d).siblings(".b_chk").trigger("click"):f.isleaf&&(e.text(f.text),c.val(f.sid),g.hide()),b.onSelect(d,f)},onSuccess:function(a){b.onSuccess(a)},onChecked:function(a,c){b.onChecked(a,c)},onCancelChecked:function(a,c){b.onCancelChecked(a,c)},onExpand:function(a,c){b.onExpand(a,c)},onCollapse:function(a,c){b.onCollapse(a,c)},onClick:function(a,c){b.onClick(a,c)}}),e.click(function(){g.setOffset(this,b.offset),j&&clearTimeout(j),b.slide?g.slideDown("fast"):g.show()}),h.click(function(){g.hide()}),g.mouseenter(function(){clearTimeout(j)}).mouseleave(function(){j=setTimeout(function(){g.hide()},1e3)})),c})},setOffset:function(b,c){var d=a(this),e=a(b),f=c||[0,0],g={l:e.offset().left,t:e.offset().top};return d.css({position:"absolute",left:g.l+1*f[0]+"px",top:g.t+1*f[1]+"px"}),d},soDropbox:function(b){var c,d,e,f,g,h;return b=a.extend({id:null,offset:[0,0],content:null,hasClose:!0,callback:function(){}},b||{}),c=a(this),d=a('<div class="so-dropbox hide"></div>'),e=a('<span class="s-dropClose"></span>'),f=Date.parse(new Date),g=b.id||"soDropbox_"+f+"_"+a(".dropbox").length,d.attr("id",g),a("body").append(d),d.append(b.content).setOffset(c,b.offset).hide(),b.hasClose&&(d.append(e),e.click(function(){d.hide()})),h=null,c.click(function(){h&&clearTimeout(h),d.show()}),d.mouseenter(function(){clearTimeout(h)}).mouseleave(function(){h=setTimeout(function(){d.hide()},1e3)}),b.callback(d),d}})}(jQuery);

/* soValidate */
!function(){$.fn.serializeObject=function(){var a={},b=this.serializeArray();return $.each(b,function(){a[this.name]?(a[this.name].push||(a[this.name]=[a[this.name]]),a[this.name].push(this.value||"")):a[this.name]=this.value||""}),a},$.fn.soValidate=function(o){var o=$.extend({attr:"validate",quickAttr:"class",errorCls:"txt-err",msgCls:"em-errMes",msgPos:null,inputPar:".p-item",errDiyAttr:"errorDiy",trim:!0,inInputs:null,exInputs:null,validate:!0,submitBtn:null,submit:function(a){a.submit()},fail:function(){}},o||{});$(this).each(function(){var $inputs,$submitBtn,_self=$(this),$rules=$.soValidate.rules,vv={validate:function(a){o=$.extend(o,a||{}),$inputs&&$inputs.unbind("blur.validate"),$submitBtn&&$submitBtn.unbind("click.validate"),$inputs=_self.find(":input").add(o.inInputs).not(o.exInputs).not(":submit"),$submitBtn=_self.find(o.submitBtn).length?_self.find(o.submitBtn):_self.find("input:submit"),o.validate&&($submitBtn.bind("click.validate",function(a){a.preventDefault(),vv._submitValidate()}),$inputs.bind("blur.validate",function(){vv._blurValidate(this)}))},_blurValidate:function(a){vv._inputCheck(a)},_submitValidate:function(){var a=!0,b=[];$inputs.each(function(){var c=vv._inputCheck(this);!c.state&&b.push(this),a=a&&c.state}),a?o.submit(_self):o.fail(_self,b)},_inputCheck:function(obj){function eachValid(a,b,c,d,e){var f=!0;return"required"==c&&(f=r["required"].rule(b)),r[c]&&b&&(f=r[c].rule(b,d)),f?(a.removeClass(tE.errorCls),vv._byTip(a,!1,tE.msgCls,tE.inputPar,tE.msgPos)):(e=e||r[c].msg(b,d),a.addClass(tE.errorCls),vv._byTip(a,e,tE.msgCls,tE.inputPar,tE.msgPos)),f}var val,attr,errDiyAttr,quickAttr,r,state,tE,errDiyO,quickArr,attrO,$o=$(obj);if(o.trim&&$o.val($.trim($o.val())),val=$o.val(),attr=$o.attr(o.attr),errDiyAttr=$o.attr(o.errDiyAttr),quickAttr=$o.attr(o.quickAttr),r=$rules,state=!0,tE={errorCls:o.errorCls,msgPos:o.msgPos,msgCls:o.msgCls,inputPar:o.inputPar},errDiyAttr&&(errDiyO=eval("("+errDiyAttr+")"),$.extend(tE,errDiyO||{})),quickAttr&&(quickArr=quickAttr.split(" "),$.each(quickArr,function(a,b){var c,d;return vArr=b.split(/\['|\["|"\]|'\]|\[|\]/),c=vArr[0],d=vArr[1]?vArr[1]:null,state=eachValid($o,val,c,null,d),state?void 0:!1}),!state))return{state:!1};if(attr){try{attrO=eval("("+attr+")")}catch(e){return window.console?console.log(attr+" 验证格式不正确，必须为JSON！"):alert(attr+" 验证格式不正确，必须为JSON！"),{state:!1}}if($.each(attrO,function(a,b){var c=a,d=null,e=null;return"string"==typeof b&&(e=b),"object"==typeof b&&(b.msg&&(e=b.msg),b.opt&&(d=b.opt)),state=eachValid($o,val,c,d,e),state?void 0:!1}),!state)return{state:!1}}return{state:!0}},_byTip:function(a,b,c,d,e){var f=e?$(e):$(a).parents(d)?$(a).parents(d):$(a).parent();b?(f.find("."+c).length<1&&f.append('<em class="'+c+'">'+b+"</em>"),f.find("."+c).html(b)):f.find("."+c).remove()},getInputs:function(){return $inputs},addInputs:function(a){return $inputs.unbind("blur.validate"),$inputs=$inputs.add(a),$inputs.bind("blur.validate",function(){vv._blurValidate(this)}),$inputs},removeInputs:function(a){return $inputs.unbind("blur.validate"),$inputs=$inputs.not(a),$inputs.bind("blur.validate",function(){vv._blurValidate(this)}),$inputs},addArea:function(a){return $inputs.unbind("blur.validate"),$inputs=$inputs.add(a+" :input"),$inputs.bind("blur.validate",function(){vv._blurValidate(this)}),$inputs},clearArea:function(a){return $inputs.unbind("blur.validate"),$inputs=$inputs.not(a+" :input"),$(a+" :input").removeClass(o.errorCls),$(a).find("."+o.msgCls).remove(),$inputs.bind("blur.validate",function(){vv._blurValidate(this)}),$inputs},destroy:function(){$inputs&&$inputs.unbind("blur.validate"),$submitBtn&&$submitBtn.unbind("click.validate"),_self.find(":input").removeClass(o.errorCls),_self.find("."+o.msgCls).remove()}};return vv.validate(),{validate:vv.validate,getInputs:vv.getInputs,addInputs:vv.addInputs,removeInputs:vv.removeInputs,addArea:vv.addArea,clearArea:vv.clearArea,destroy:vv.destroy}})},$.soValidate={rules:{},addRex:function(a){$.extend(this.rules,a)}},$.soValidate.addRex({required:{rule:function(a){return""!=a},msg:function(){return"请填写必填字段！"}},baseChar:{rule:function(a){return/^\w+$/.test(a)},msg:function(){return"只能用英文字母、数字和下划线"}},baseCnChar:{rule:function(a){return/^[\u0391-\uFFE5\w]+$/.test(a)},msg:function(){return"只能用中文、英文字母、数字和下划线"}},number:{rule:function(a){return/^[\d]+([\.][\d]+){0,1}$/.test(a)},msg:function(){return"请填写正确的数字！"}},email:{rule:function(a){return/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(a)},msg:function(){return"请填写正确的电子邮箱！"}},phone:{rule:function(a){return/^(0\d{2,3})-(\d{7,8})(-(\d{2,}))?$/.test(a)},msg:function(){return"请填写正确的电话号码！如：010-62392951"}},mobile:{rule:function(a){return/^((1)+\d{10})$/.test(a)},msg:function(){return"请填写正确的手机号！"}},equalTo:{rule:function(a,b){return a==$(b).val()},msg:function(){return"两次填写的值不一致，请重新填写！"}},zipCode:{rule:function(a){return/^[0-9]{6}$/.test(a)},msg:function(){return"请填写正确的邮政编码！"}},len:{rule:function(a,b){return a.length>b[0]&&a.length<b[1]},msg:function(a,b){return"请填写一个长度大于"+b[0]+"小于"+b[1]+"的字符"}},max:{rule:function(a,b){return b>a},msg:function(a,b){return"请填写一个小于"+b+"的数字"}},min:{rule:function(a,b){return a>b},msg:function(a,b){return"请填写一个大于"+b+"的数字"}},plateNum:{rule:function(a){return/^[A-Za-z0-9]{6}$/.test(a)},msg:function(){return"请填写正确的车牌号码！"}},remote:{rule:function(a,b){var d,e,c={};return c[b.key]=a,d=$.extend(c,b.data||{}),e=!1,$.ajax({url:b.url,data:d,async:!1,success:function(a){e=a.success},error:function(){alert("向服务器请求验证失败！")}}),e},msg:function(){return"您的填写不正确！"}}}),$.fn.groupRequired=function(a){var c,b={style:"and",type:"required",attr:"class"};return"string"==typeof a?b.style=a:$.extend(b,a||{}),c=$(this),"and"==b.style&&c.blur(function(){""!=this.value?c.addClass(b.type):c.removeClass(b.type)}),"or"==b.style&&(c.addClass(b.type),c.blur(function(){var a=!1;c.each(function(){return""!=$(this).val()?(a=!0,!1):void 0}),a?c.removeClass(b.type):c.addClass(b.type)})),c}}(jQuery);


$.soUpload=function(a){function k(a){var b,c;g.empty();for(b in a)c=$("<input type='hidden'/>").attr({name:b,value:a[b]}),g.append(c)}function l(b,c,d){var e,f;b?a.msgPos?$(a.msgPos).html(d):(e=c.parent(),f=e.find(".em-errMes"),f.length?f.html(d):e.append('<em class="em-errMes">'+d+"</em>")):a.msgPos?$(a.msgPos).empty():(e=c.parent(),f=e.find(".em-errMes"),f.length&&f.remove())}var b,c,d,e,f,g,h,i,j;a=$.extend({action:"",params:{},upBtn:null,fileName:null,submitBrn:null,nameText:null,emptyMsg:"",msgPos:null,dataType:"JSON",accept:[".jpg",".png"],errAcceptMsg:"上传文件格式不正确！",submit:function(){},complete:function(){}},a||{}),b=Math.floor(1e4*Math.random()),c="iframeF_"+b,d=$('<iframe id="'+c+'" name="'+c+'" style="display:none;"></iframe>'),e=$("<form></form>"),e.attr({target:c,action:a.action,method:"post",enctype:"multipart/form-data"}).css({position:"absolute",top:"-3000px",left:"-3000px",width:"0px",height:"0px"}),f=$("<input type='file'/>"),g=$("<div class='paramsBox"+b+"'></div>"),f.css({position:"absolute",top:"-3000px",left:"-3000px",opacity:0,width:"0px",height:"0px"}),f.attr({name:a.fileName}),e.append(f),$("body").append(e),$("body").append(d);for(h in a.params)i=$("<input type='hidden'/>").attr({name:h,value:a.params[h]}),g.append(i);return e.append(g),$(a.upBtn).click(function(){f.click()}),j=$(a.nameText).attr("readonly","readonly"),f.change(function(){j.val(this.value)}),$(a.submitBrn).click(function(){var c,b=j.val();if(""==$.trim(b))l(!0,j,a.emptyMsg);else{if(a.accept.length&&(c=!1,$.each(a.accept,function(a,d){return b.indexOf(d)>0?(c=!0,!1):void 0}),!c))return l(!0,j,a.errAcceptMsg),!1;l(!1,j),a.submit(e),e.submit()}}),d.load(function(){var b=document.getElementById(c),d=$(b.contentWindow.document.body).text();if(d)try{"string"==typeof d&&(d=$.parseJSON(d))}catch(e){d="error"}f.val(""),j.val(""),a.complete.call(null,d)}),{upForm:e,iframe:d,upinput:f,updateParams:k}};