var gulp = require("gulp");

//先进行拷贝
gulp.task("index_copy", function(){
	return gulp.src("index.html").pipe(gulp.dest("Lenovo1"))
	.pipe(connect.reload());
})
//图片拷贝
gulp.task("images", function(){
	return gulp.src("img/**/*").pipe(gulp.dest("Lenovo1/img"))
	.pipe(connect.reload());
})
//js文件拷贝
//对js文件进行压缩，并且要重命名  先合并->压缩->重命名  
//合并 gulp-concat
//压缩 gulp-uglify
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("scripts", function(){
	return gulp.src(["perfect_startMove.js", "index.js"])
	.pipe(concat("total.js"))
	.pipe(gulp.dest("Lenovo1/js"))
	.pipe(uglify())
	.pipe(rename("total.min.js"))
	.pipe(gulp.dest("Lenovo1/js"))
	.pipe(connect.reload());
})

//启动服务器  gulp-connect
var connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root: "Lenovo1",
		livereload: true
	});
})

//将scss文件转成css文件  gulp-scss
//压缩以后重命名  gulp-minify-css  gulp-rename
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");

var scss = require("gulp-scss");
gulp.task("scss", function(){
	return gulp.src("index.scss")
	.pipe(scss())
	.pipe(gulp.dest("Lenovo1/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("Lenovo1/css"))
	.pipe(connect.reload());
})

//对上述所有操作进行监听
gulp.task("watch", function(){
	gulp.watch("index.html", ["index_copy"]);
	gulp.watch("index.scss", ["scss"]);
	gulp.watch("*.js", ["scripts"]);
	gulp.watch("img/**/*", ["images"]);
})


//先将我们操作目录建立起来
gulp.task("bulid", ["index_copy", "images", "scss", "scripts"]);

gulp.task("default", ["server", "watch"]);

















