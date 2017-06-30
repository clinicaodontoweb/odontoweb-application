var gulp			= require('gulp');
var concat			= require('gulp-concat');
var uglify			= require('gulp-uglify');
var sass			= require('gulp-sass');
var cssmin			= require('gulp-cssmin');
var watch			= require('gulp-watch');
var rename			= require('gulp-rename');
var nodemon			= require('gulp-nodemon');
var clean			= require('gulp-clean');
var runSequence		= require('run-sequence');
var path 			= require('path');

var depsFolder		= 'bower_components/'

gulp.task('default', function(callback){
	runSequence('clean-dist-folder', 'deps-js', 'deps-css', 'app-js', 'app-css', 'copy-html', 'copy-img');
});

gulp.task('watch', function(){
	gulp.watch('client/**/*.js', ['app-js']);
	gulp.watch('client/**/*.html', ['copy-html']);
	gulp.watch('client/assets/sass/**/*.scss', ['app-css']);
	gulp.watch('client/assets/img/**/*.*', ['copy-img']);
});

gulp.task('serve', ['watch'], function(){
	return nodemon({
		script: 'server.js',
		ignore: 'client/*'
	})
	.on('restart', function(){
		console.log('restarted');
	});
});

gulp.task('clean-dist-folder', () => {
    return gulp.src("./dist/", {read: false})
                .pipe(clean());
});

gulp.task('deps-js', function (){
	return gulp.src([depsFolder + 'lodash/lodash.js',
					depsFolder + 'jquery/dist/jquery.js',
					depsFolder + 'moment/moment.js',
					depsFolder + 'moment/locale/pt-br.js',
					depsFolder + 'angular/angular.js',
					depsFolder + 'angular-route/angular-route.js',
					depsFolder + 'angular-resource/angular-resource.js',
					depsFolder + 'angular-jwt/dist/angular-jwt.js',
					depsFolder + 'restangular/dist/restangular.js',
					depsFolder + 'bootstrap/dist/js/bootstrap.js',
					depsFolder + 'angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
					depsFolder + 'angular-bootstrap/ui-bootstrap-tpls.js',
					depsFolder + 'angular-bootstrap/ui-bootstrap.js'
					])
			.pipe(concat('odontoweb-deps.js'))
			.pipe(gulp.dest('dist'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'));
});

gulp.task('deps-css', function (){
	return gulp.src([depsFolder + 'bootstrap/dist/css/bootstrap.css',
					depsFolder + 'angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css',
					depsFolder + 'angular-bootstrap/ui-bootstrap-csp.css'
					])
			.pipe(concat('odontoweb-deps.css'))
			.pipe(gulp.dest('dist'))
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'));
});

gulp.task('app-js', function (){
	return gulp.src(['client/app/**/*.js'])
			.pipe(concat('odontoweb-app.js'))
			.pipe(gulp.dest('dist'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'));
});

gulp.task('app-css', function (){
	return gulp.src(['client/assets/sass/**/*.scss'])
			.pipe(sass())
			.pipe(concat('odontoweb-app.css'))
			.pipe(gulp.dest('dist'))
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'));
});

gulp.task('copy-img', function (){
	return gulp.src('client/assets/img/**/*.*')
			.pipe(gulp.dest('dist/img'));
});

gulp.task('copy-html', function (){
	return gulp.src('client/**/*.html')
			.pipe(gulp.dest('dist'));
});