/* ---------------标题栏添加右键显示隐藏和排序列功能 begin---------------- */
var createGridHeaderContextMenu = function(e, field) {
        e.preventDefault();
        var grid = $(this);/* grid本身 */
        var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
        if (!headerContextMenu) {
                var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
                //var asc = $('<div iconCls="icon-asc" field="asc">升序</div>').appendTo(tmenu);
               // var desc = $('<div iconCls="icon-desc" field="desc">降序</div>').appendTo(tmenu);
                var filedHTML = $('<div iconCls="icon-columns"></div>');
                var span = $('<span>显示列/隐藏列</span>');
                var spdiv = $('<div></div>');
                var fields = grid.datagrid('getColumnFields');
                for ( var i = 0; i < fields.length; i++) {
                        var fildOption = grid.datagrid('getColumnOption', fields[i]);
                        if (!fildOption.hidden) {
                                $('<div iconCls="icon-checked" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(spdiv);
                        } else {
                                $('<div iconCls="icon-unchecked" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(spdiv);
                        }
                }
                span.appendTo(filedHTML);
                spdiv.appendTo(filedHTML);
                filedHTML.appendTo(tmenu);
                headerContextMenu = this.headerContextMenu = tmenu.menu({
                        onClick : function(item) {
                                var f = $(this).attr('field')
                                var fieldProperty = $(item.target).attr('field');
                                if (item.iconCls == 'icon-checked') {
                                        grid.datagrid('hideColumn', fieldProperty);
                                        $(this).menu('setIcon', {
                                                target : item.target,
                                                iconCls : 'icon-unchecked'
                                        });
                                }
                                if (item.iconCls == 'icon-unchecked') {
                                        grid.datagrid('showColumn', fieldProperty);
                                        $(this).menu('setIcon', {
                                                target : item.target,
                                                iconCls : 'icon-checked'
                                        });
                                }
                        }
                });
        }
        headerContextMenu.attr('field',field);
        headerContextMenu.menu('show', {
                left : e.pageX,
                top : e.pageY
        });
};
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
/* ---------------标题栏添加右键显示隐藏和排序列功能 end---------------- */

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



