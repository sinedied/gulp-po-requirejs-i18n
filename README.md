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

- `root`: (default: `false`) If true, put translations in a `root` key, and add prefix to translations
  values (`t_` by default).

- `rootPrefix`: (default: `t_`) A prefix that will be added to translations values in root mode.

- `supported`: (default: `[]`) Output keys for supported languages, only if `root` is enabled.
