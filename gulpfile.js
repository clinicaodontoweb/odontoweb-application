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

var depsFolder		= 'bower_components/';
var nodeFolder		= 'node_modules/';

gulp.task('default', function(callback){
	runSequence('clean-dist-folder', 'deps-js', 'deps-css', 'app-js', 'app-css', 'copy-html', 'copy-html-calendar', 'copy-img', 'copy-fonts');
});

gulp.task('watch', function(){
	gulp.watch('client/**/*.js', ['app-js']);
	gulp.watch('client/**/*.html', ['copy-html']);
	gulp.watch('lib/**/*.html', ['copy-html-calendar']);
	gulp.watch('client/**/*.scss', ['app-css']);
	gulp.watch('client/assets/img/**/*.*', ['copy-img']);
});

gulp.task('serve', ['watch'], function(){
	var stream =  nodemon({
		script: 'server.js',
		ignore: 'client/*'
	})

	stream
		.on('restart', function(){
			console.log('Server Restarted!\n');
		})
		.on('crash', function() {
		    console.error('Application has crashed!\n')
			stream.emit('restart', 2)
		})
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
					'lib/calendar/angular-bootstrap-calendar-tpls.js',
					depsFolder + 'angular-bootstrap/ui-bootstrap-tpls.js',
					depsFolder + 'angular-bootstrap/ui-bootstrap.js',
					depsFolder + 'ngstorage/ngStorage.js',
					depsFolder + 'toastr/toastr.js',
					depsFolder + 'angular-aria/angular-aria.js',
					depsFolder + 'angular-animate/angular-animate.js',
					depsFolder + 'angular-material/angular-material.js',
					depsFolder + 'angular-br-filters/release/angular-br-filters.js',
					nodeFolder + 'angular-input-masks/releases/angular-input-masks-standalone.js',
					depsFolder + 'angular-loading-bar/build/loading-bar.js',
					depsFolder + 'angular-viacep/dist/angular-viacep.min.js',
					depsFolder + 'angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
					depsFolder + 'checklist-model/checklist-model.js',
					depsFolder + 'br-masks/releases/br-masks-standalone.js'
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
					depsFolder + 'angular-bootstrap/ui-bootstrap-csp.css',
					depsFolder + 'toastr/toastr.css',
					depsFolder + 'angular-material/angular-material.css',
					depsFolder + 'angular-loading-bar/build/loading-bar.css',
					depsFolder + 'angular-bootstrap-colorpicker/css/colorpicker.css'
					])
			.pipe(concat('odontoweb-deps.css'))
			.pipe(gulp.dest('dist'))
			.pipe(cssmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'));
});

gulp.task('app-js', function (){
	return gulp.src(['client/app/**/*module*.js', 'client/app/**/*.js'])
			.pipe(concat('odontoweb-app.js'))
			.pipe(gulp.dest('dist'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'));
});

gulp.task('app-css', function (){
	return gulp.src(['client/assets/sass/app.scss'])
			.pipe(sass())
			.pipe(gulp.dest('dist'))
			.pipe(cssmin())
			.pipe(rename({basename: 'odontoweb-app', suffix: '.min'}))
			.pipe(gulp.dest('dist'));
});

gulp.task('copy-img', function (){
	return gulp.src('client/assets/img/**/*.*')
			.pipe(gulp.dest('dist/img'));
});

gulp.task('copy-html', function (){
	return gulp.src(['client/**/*.html'])
			.pipe(gulp.dest('dist'));
});

gulp.task('copy-html-calendar', function (){
	return gulp.src(['lib/calendar/templates/calendarWeekView.html', 'lib/calendar/templates/calendarDayView.html', 'lib/calendar/templates/calendarHourList.html'])
			.pipe(gulp.dest('dist/app/core/calendar'));
});

gulp.task('copy-fonts', function (){
	return gulp.src([depsFolder + 'bootstrap/dist/fonts/*.*'])
			.pipe(gulp.dest('dist/fonts'));
});