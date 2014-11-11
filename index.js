// through2 is a thin wrapper around node transform streams
var _ = require('lodash');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// consts
const PLUGIN_NAME = 'gulp-sync-config-bower';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

/**
 * Default options
 */
var defaultOptions = {
  package: 'package.json',
  fields: ['name', 'version', 'main', 'keywords'],
};

/**
 * Plugin function
 */
function gulpSyncConfig(userOptions) {
  var options = _.merge({}, defaultOptions, userOptions);

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // do nothing if no contents
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixText, file.contents]);
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(prefixStream(prefixText));
    }

    this.push(file);

    return cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
module.exports = gulpSyncConfig;
