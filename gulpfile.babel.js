import gulp from 'gulp';
import sass from 'gulp-sass';
import gutil, { PluginError } from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

import assign from 'object-assign';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

import del from 'del';

gulp.task('copy', () => {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['clean', 'sass', 'copy'], () => {
  const b = browserify('src/index.js', { debug: true })
    .transform(babelify);
  return bundle(b);
});

gulp.task('watch', () => {
  const b = browserify('src/index.js', assign({ debug: true }, watchify.args))
    .transform(babelify);
  const w = watchify(b)
    .on('update', () => bundle(w))
    .on('log', gutil.log);
  return bundle(w)
});

gulp.task('sass', () => {
  return gulp.src(['src/main.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('clean', () => {
  return del('public');
});

gulp.task('default', ['build', 'watch']);

function bundle(b) {
  return b.bundle()
    .on('error', (e) => {
      console.error(e.stack);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'));
}
