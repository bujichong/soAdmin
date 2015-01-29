require.config({
    //baseUrl: '/js',
    paths: {
        jquery: 'jquery-1.8.2.min'
        ,soExt: 'plugin/jquery.soExt'//base ext (hoverClass,overOnlyClass,autoImgW,openSelVal,textFocus,autoSameH,soScrollTo,soLazy)
        ,soChange: 'plugin/jquery.soChange'//soChange
        // ,sobox: 'plugin/jquery.sobox'//sobox
        // ,soTree: 'plugin/jquery.soTree'//soTree
        // ,soValidate: 'plugin/jquery.soValidate'//soValidate
        // ,vals: 'plugin/vals'//vals 结合sovalidate在表单里使用
        // ,requrl: 'plugin/requrl'//requrl
        // ,color: 'plugin/jquery.color'//color
        // ,cookie: 'plugin/cookie'//cookie plus+
    },
    shim: {
        jquery: {exports: 'jquery'}
        ,soExt: {deps: ['jquery'],exports: 'soExt'}
        ,soChange: {deps: ['jquery'],exports: 'soChange'}
        // ,cookie: {deps: ['jquery'],exports: 'cookie'}
        // ,sobox: {deps: ['jquery'],exports: 'sobox'}
        // ,soTree: {deps: ['jquery'],exports: 'soTree'}
        // ,soValidate: {deps: ['jquery'],exports: 'soValidate'}
        // ,vals: {deps: ['jquery'],exports: 'vals'}
        // ,color: {deps: ['jquery'],exports: 'color'}
        // ,requrl: {deps: ['jquery','sobox'],exports: 'requrl'}
    }
}); 
require(['jquery','soExt','soChange'], function($) {

    var sopro ={
        init : function () {
            var me = this;
            me.maintab();
            me.favHome();
        },
        maintab : function () {
            if($('.maintab').length){
                $('.maintab').soChange({
                    thumbObj : '.maincenter .s-title',
                    thumbNowClass : 's-title-now',
                    autoChange : false,
                    slideTime : 0
                });
            }
        },
        favHome : function () {//顶部收藏
            $('.a-addFav').click(function () {
                var siteUrl = window.location.hostname;
                var title="机械网址大全-机械网站精选-工程机械导航";
                if (document.all) {//ie
                    window.external.addFavorite(siteUrl, title);
                }
                else {
                    alert("当前浏览器不支持此操作，请使用 Ctrl+D 收藏本站！");
                }
                return false;
            });
        },
    }

    $(function () {
        sopro.init();

    });

});
