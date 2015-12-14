# gulp-po-requirejs-i18n

Utility to convert PO files to [requirejs-i18n](https://github.com/requirejs/i18n/) files with Gulp.

# Usage

```
var gulp = require('gulp'),
    poRequire = require('gulp-po-requirejs-i18n');

gulp.task('i18n', function() {
    return gulp
        .src('locales/*.po')
        .pipe(poRequire([options]))
        .dest('dist/locales');
});
```

# Options

- `name`: (default: `'strings'`) The name prefix for converted files.

- `root`: (default: `false`) If true, put translations in a `root` key, and add `t_` prefix to translations
  values.

- `supported`: (default: `[]`) Output keys for supported languages, only if `root` is enabled.
