#gulp-config-sync
[![NPM version](https://badge.fury.io/js/gulp-config-sync.svg)](http://badge.fury.io/js/gulp-config-sync)

> Synchronize config fields among package configs (package.json, bower.json, component.js...)

## Gulp

Requires [gulp 3](http://gulpjs.com/)


## Usage

Install `gulp-config-sync` as a development dependency

```sh
$ npm install gulp-config-sync --save-dev
```

In your `gulpfile.js`

```javascript
// import plugin
var sync = require('gulp-config-sync');

gulp.task('sync', function() {
  return gulp.src('bower.json')
    .pipe(sync())
    .pipe(gulp.dest('.')); // write it to the same dir
});
```

You can run the new task
```sh
$ gulp sync
```

Or add it to existing tasks

```javascript
gulp.task('default', ['sync']);
```

## Options

- `src`
  - Default `package.json`
  - The path to the source.json file

- `fields`
  - Default `[
    'name',
    'version',
    'description',
    'keywords'
  ]`
  - Specifies the fields to be synchronized

- `space`
  - Default (2 whitespaces)
  - Used for prettyprinting the result. See [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

### Example

```javascript
var options = {
  src: 'source.json',
  fields: [
    'name',
    'version',
    'description',
  ],
  space: '    ',
};

gulp.src('bower.json')
  .pipe(sync(options))
  .pipe(gulp.dest(''));
```

## LICENSE
[MIT](LICENSE)
