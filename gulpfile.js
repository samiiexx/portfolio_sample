// Require plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Source and destination directories
const srcDir = 'src';
const destDir = 'public'; // Also known as 'dist' or 'build'

// Copy Files
function copyFiles() {
    return gulp.src([`${srcDir}/*.html`, `${srcDir}/*.jpg`, `${srcDir}/*.png`])
        .pipe(gulp.dest(destDir));
}

function compileSass() {
    return gulp.src(srcDir + '/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(destDir + '/css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: destDir
        }
    });
    gulp.watch(srcDir + '/scss/**/*.scss', compileSass);
    gulp.watch(srcDir + '/**/*.html').on('change', browserSync.reload);
    gulp.watch(srcDir + '/js/**/*.js').on('change', browserSync.reload);
}

exports.compileSass = compileSass;
exports.watch = watch;
exports.all = gulp.parallel(copyFiles, compileSass);