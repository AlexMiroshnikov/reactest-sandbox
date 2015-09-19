var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    del = require('del'),
    jsx = require('gulp-react'),
    uglify = require('gulp-uglify');

var logError = function(e){
    console.log(['Error', e.message, 'at ' + e.fileName + ':' + e.lineNumber].join("\n"));
};

var destJsJsx = './public/react/build-gulp/',
    destJsMin = './public/react/build-min/';

gulp.task('scss', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('minify-css', ['scss'], function() {
    var path = './public/css/',
        minFileName = 'min.css';

    return del([path, minFileName].join('/')).then(function() {
        return gulp.src([path, '*.css'].join('/'))
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(concat(minFileName, {newLine: ''}))
            .pipe(gulp.dest(path));
    });
});

gulp.task('jsx', function(){
    return gulp.src('./public/react/app/**/*.jsx')
        .pipe(jsx().on('error', logError))
        .pipe(gulp.dest(destJsJsx));
});

gulp.task('uglify', ['jsx'], function(){
    return gulp.src([
            destJsJsx + '**/*.js',
            './public/react/app/**/*.js'
        ])
        .pipe(uglify().on('error', logError))
        .pipe(gulp.dest(destJsMin));
});

gulp.task('minify-js', ['uglify'], function(){
    var minFileName = 'min-gulp.js';
    return gulp.src([
            destJsMin + '**/*.js',
            '!' + destJsMin + 'js.js'
        ])
        .pipe(concat(minFileName, {newLine: ''}))
        .pipe(gulp.dest('./public/react/'))
        .on('finish', function(){
            return gulp.src([
                './public/react/min-gulp.js',
                destJsMin + 'js.js'
            ])
            .pipe(concat(minFileName, {newLine: ''}))
            .pipe(gulp.dest('./public/react/'));
        });
});

gulp.task('cleanup', ['minify-js'], function(){
    return del([
        destJsJsx,
        destJsMin
    ]);
});

//Watch task
gulp.task('default',function() {
    gulp.watch('scss/**/*.scss',['scss', 'minify-css']);
});

gulp.task('js', ['jsx', 'uglify', 'minify-js', 'cleanup']);