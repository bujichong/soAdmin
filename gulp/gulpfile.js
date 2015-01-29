var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
// var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var requirejs = require('gulp-requirejs-simple');
var sass = require('gulp-ruby-sass');


var bPath = '../';
var paths = {
    sjs: bPath + 'sjs/',
    scss : bPath + 'scss/',
    js: bPath + 'js/',
    css : bPath + 'css/'
};
var files = {
    sjs: [paths.sjs + '*.js', '!' + paths.sjs +'*.min.js'], //需要监控变化的sjs文件
    js: [paths.js + '*.js'], //需要监控变化的js文件
    scss : [paths.scss+'*.scss'],//需要监控变化的scss文件
    scssout : [paths.scss+'*.scss','!' +paths.scss+'_*.scss'],//需要变化输出的scss文件
    css: [paths.css+'*.css', '!' + paths.css+'*.min.css'] //需要监控变化的css文件
};


var minJsTask = {
    main: { //压缩main.js
        requireJs: true,
        baseUrl: paths.sjs,
        name: 'main',
        out: paths.js + '/main.min.js',
        mainConfigFile: paths.sjs + 'config.r.js',
        watchFile: [paths.sjs  + '*.js'] //需要监控变化的js文件
    }
}

var jsTaskArr = [];
for (task in minJsTask) {
    if (minJsTask[task].requireJs) {
        gulp.task(task, requirejs(minJsTask[task]));
    }
    jsTaskArr.push(task);
}

//js
gulp.task('minjs', function() {
  gulp.src(files.sjs)
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.js))
});


//sass
gulp.task('sass', function() {
    gulp.src(files.scssout)
        .pipe(sass({
            style: 'compact',//nested, compact, compressed, expanded
            lineNumbers : true,
            //debugInfo : true,
            quiet: true,
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(gulp.dest(paths.css));
});


//css
gulp.task('mincss', function() {
    //var filter = gulpFilter(['*', '!*-min.css']);
    return gulp.src(files.css)
        .pipe(minifyCSS({
            //keepBreaks: true
        }))
        //.pipe(filter)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.css));
});

gulp.task('require', jsTaskArr);

//watch
gulp.task('watch', function() {
    gulp.watch(files.scss, ['sass']);
    //gulp.watch(paths.css, ['mincss']);
    //gulp.watch(files.sjs, ['minjs']);

    for (task in minJsTask) {
        gulp.watch(minJsTask[task].watchFile, [task]);
    };

//    gulp.watch(minJsTask.gallery.watchFile, ['gallery']);
//    gulp.watch(minJsTask.a_main.watchFile, ['a_main']);
//    gulp.watch(minJsTask.b_main.watchFile, ['b_main']);
//    gulp.watch(minJsTask.a_oil.watchFile, ['a_oil']);
//    gulp.watch(minJsTask.b_oil.watchFile, ['b_oil']);
//    gulp.watch(minJsTask.a_track.watchFile, ['a_track']);
//    gulp.watch(minJsTask.b_track.watchFile, ['b_track']);

    // for (task in minJsTask) {
    //     gulp.watch(task.watchFile,[task]);
    // };
});

gulp.task('default',function () {
	gulp.run('sass','minjs');
});
