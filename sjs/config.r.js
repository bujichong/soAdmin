//node r.js -o build-bmap.js
require.config({
        paths: {
                jquery: 'jquery-1.8.2.min', 
                soExt: 'plugin/jquery.soExt',//base ext (hoverClass,overOnlyClass,autoImgW,openSelVal,textFocus,autoSameH,soScrollTo,soLazy)
                soChange: 'plugin/jquery.soChange',//soChange
                sobox: 'plugin/jquery.sobox',//sobox
                soTree: 'plugin/jquery.soTree',//soTree
                soValidate: 'plugin/jquery.soValidate',//soValidate
                vals: 'plugin/vals',//vals 结合sovalidate在表单里使用
                requrl: 'plugin/requrl',//requrl
                color: 'plugin/jquery.color',//color
                cookie: 'plugin/cookie'//cookie plus+
        },
        shim: {
                jquery: {exports: 'jquery'},
                soExt: {deps: ['jquery'],exports: 'soExt'},
                cookie: {deps: ['jquery'],exports: 'cookie'},
                soChange: {deps: ['jquery'],exports: 'soChange'},
                sobox: {deps: ['jquery'],exports: 'sobox'},
                soTree: {deps: ['jquery'],exports: 'soTree'},
                soValidate: {deps: ['jquery'],exports: 'soValidate'},
                vals: {deps: ['jquery'],exports: 'vals'},
                color: {deps: ['jquery'],exports: 'color'},
                requrl: {deps: ['jquery','sobox'],exports: 'requrl'}
        }
});