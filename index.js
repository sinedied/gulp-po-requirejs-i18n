var through = require('through2'),
  gutil = require('gulp-util'),
  po = require('node-po'),
  extend = require('extend'),
  path = require('path'),
  PluginError = gutil.PluginError;

function error(error, cb) {
  this.emit('error', new PluginError('gulp-po-requirejs-i18n', error));
  return cb();
}

function escapeQuotes(str) {
  return str.replace(/'/g, '\\\'');
}

module.exports = function(options) {

  options = extend({
    name: 'strings',
    root: false,
    rootPrefix: 't_',
    supported: []
  }, options);

  function write(f, enc, cb) {

    if (f.isNull()) {
      this.push(f);
      return cb();
    }

    if (f.isStream()) {
      error('Streaming not supported', cb);
    }

    var poData = po.parse(f.contents.toString('utf-8'));
    var res = 'define({\n';
    var indent = options.root ? '    ' : '  ';
    var prefix = options.root ? options.rootPrefix : '';

    if (!poData) {
      error('Unable to parse file ' + f.path, cb);
    }

    if (options.root) {
      res += '  root: {\n';
    }

    poData.items.forEach(function(item, index) {
      res += indent + '\'' + escapeQuotes(item.msgid) + '\': \'' + escapeQuotes(prefix + item.msgstr[0]) + '\'';
      res += (index !== poData.items.length - 1 ? ',' : '') + '\n';
    });

    if (options.root) {
      res += '  }';

      if (options.supported.length) {
        res += ',\n';

        options.supported.forEach(function(language, index) {
          res += '  \'' + language + '\': true' + (index !== options.supported.length - 1 ? ',' : '') + '\n';
        });
      } else {
        res += '\n';
      }

      f.path = path.join(path.dirname(f.path), options.name + '.js');
    } else {
      f.path = path.join(path.dirname(f.path), path.basename(f.path, '.po'), options.name + '.js');
    }

    res += '});\n';
    f.contents = new Buffer(res);

    this.push(f);
    cb();
  }

  function end(cb) {
    cb();
  }

  return through.obj(write, end);

};
