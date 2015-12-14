var gulp = require('gulp'),
  poRequire = require('./');

gulp.task('i18n', ['i18n:root'], function() {
  return gulp.src('test/*.po')
    .pipe(poRequire())
    .pipe(gulp.dest('test/out/'));
});

gulp.task('i18n:root', function() {
  return gulp.src('test/en-us.po')
    .pipe(poRequire({
      root: true,
      supported: ['en-us', 'fr-fr']
    }))
    .pipe(gulp.dest('test/out/'));
});

gulp.task('default', ['i18n']);
