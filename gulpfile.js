var gulp = require('gulp'),
    // 引入压缩js模块
    uglify = require('gulp-uglify'),
    // 压缩css模块
    clean = require('gulp-clean-css'),
    // 修改名字
    rename = require('gulp-rename'),
    // 浏览器刷新
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    scss = require('gulp-sass');
// 定义压缩js的任务
gulp.task('ysjs', function(){
    // 要压缩的文件
    gulp.src('./assets/js/index.js')
        // 执行压缩过程
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))  
        // 压缩之后的文件：要保存文件的位置（此处不能修改文件的名字）
        .pipe(gulp.dest('./assets/dest'))
})
// 定义压缩css的任务
gulp.task('yscss',function(){
    gulp.src('./assets/css/index.css')
        .pipe(clean())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./assets/dest'))
})
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['scss'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/scss/*.scss", ['scss']);
    gulp.watch("*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('scss', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
        .pipe(gulp.dest("assets/css"))
        .pipe(reload({ stream: true }));
});

gulp.task('default', ['serve']);