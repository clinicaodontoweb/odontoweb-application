var gulp			= require('gulp');
var concat			= require('gulp-concat');
var uglify			= require('gulp-uglify');
var sass			= require('gulp-sass');
var cssmin			= require('gulp-cssmin');
var watch			= require('gulp-watch');
var rename			= require('gulp-rename');
var runSequence		= require('run-sequence');
var path 			= require('path');

var depsFolder		= 'bower_components/'

gulp.task('default', function(callback){
	runSequence('deps-js', 'deps-css', 'app-js', 'app-css');
});

gulp.task('watch', function(){
	gulp.watch('client/resources/js/**/*.js', ['app-js']);
	gulp.watch('client/resources/sass/**/*.scss', ['app-css']);
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
					depsFolder + 'angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js'
					])
			.pipe(concat('odontoweb-deps.js'))
			.pipe(gulp.dest('client/public'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('client/public'));
});

gulp.task('deps-css', function (){
	return gulp.src([depsFolder + 'bootstrap/dist/css/bootstrap.css',
					depsFolder + 'angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css'
					])
			.pipe(concat('odontoweb-deps.css'))
			.pipe(gulp.dest('client/public'))
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('client/public'));
});

gulp.task('app-js', function (){
	return gulp.src(['client/resources/js/**/*.js'])
			.pipe(concat('odontoweb-app.js'))
			.pipe(gulp.dest('client/public'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('client/public'));
});

gulp.task('app-css', function (){
	return gulp.src(['client/resources/sass/**/*.scss'])
			.pipe(sass())
			.pipe(concat('odontoweb-app.css'))
			.pipe(gulp.dest('client/public'))
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('client/public'));
});