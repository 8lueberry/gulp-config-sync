// through2 is a thin wrapper around node transform streams
var _ = require('lodash');
var through = require('through2');
var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var Q = require('kew');

// consts
const PLUGIN_NAME = 'gulp-config-bower';

/**
 * Default options
 */
var defaultOptions = {
  package: 'package.json',
  fields: [
    'name',
    'version',
    'description',
    'keywords',
  ],
};

/**
 * Plugin function
 */
function plugin(options) {
  var opts = _.merge({}, defaultOptions, options);

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb();
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      syncConfig(file, opts, cb);
    }
  });

  // returning the file stream
  return stream;
};

function syncConfig(file, opts, cb) {
  Q.resolve()

  // get the package.json
  .then(function() {
    var src = fs.readFileSync(opts.package);
    return JSON.parse(src);
  })

  // replace fields in bower.json
  .then(function(packageObj) {
    var configObj = JSON.parse(String(file.contents));

    _.forEach(opts.fields, function(field) {
      configObj[field] = packageObj[field];
    });

    return JSON.stringify(configObj);
  })

  // return the new buffer
  .then(function(result) {
    file.contents = new Buffer(result);
    return cb(null, file);
  })
  .fail(function(err) {
    return cb(new PluginError(PLUGIN_NAME, err));
  })
  .end();
}

// exporting the plugin main function
module.exports = plugin;