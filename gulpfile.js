var gulp = require('gulp');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin'); // automatiza tarefas
var csslint = require('gulp-csslint'); // erros css no codigo
var browserSync = require('browser-sync').create(); // auto reloading
var jshint = require('gulp-jshint'); // erros js no codigo
var historyFallback  = require('connect-history-api-fallback'); // browserSinc e seus problemas de rota
// var imagemin = require('gulp-imagemin'); // optmiza tamanho das imagens
// var clean = require('gulp-clean'); // deleta arquivos
// var concat = require('gulp-concat'); // concatena arquivo
// var htmlReplace = require('gulp-html-replace'); // substitui imports em html
// var uglify = require('gulp-uglify'); // minifica css
// var cssmin = require('gulp-cssmin'); // minifica css
// var jshintStylish = require('jshint-stylish'); // reporter mais bonito pro jshint
// var autoprefixer = require('gulp-autoprefixer'); // adiciona prefix no css

gulp.task('default', ['copy'],function() {
    gulp.start(
        'usemin');
});

gulp.task('copy', ['clean'], function() {

    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {

    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('sass', function() {

    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('usemin', function() {

    gulp.src('dist/**/*.html')
        .pipe(usemin({
            'js' : [uglify],
            'css' : [autoprefixer({
                browsers: ['last 10 versions']
            })]
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('server', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: 'src',
            middleware: [
                historyFallback()
            ]
        }
    });

    gulp.watch('src/js/*.js').on('change', function(event) {
        gulp.src(event.path)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
    });

    gulp.watch('src/css/*.css').on('change', function(event) {
        gulp.src(event.path)
        .pipe(csslint());
    });

    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/**/*').on('change', browserSync.reload);
});
