var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var beml = require('gulp-beml');
var jeditor = require('gulp-json-editor');
var tarsConfig = require('../../../tars-config');
var replace = require('gulp-replace-task');
var notifier = require('../../helpers/notifier');
var fs = require('fs');

var handlebarsOptions = {
    batch: ['./markup/modules'],
    helpers: require('../../helpers/handlebars-helpers')
};

/**
 * Handlebars compilation of pages templates.
 * Templates with _ prefix won't be compiled
 * @param  {Object} buildOptions
 */
module.exports = function(buildOptions) {

    function iterator(array, data, callback) {
        var item, i = 0;
        var hashKeys = Object.keys(array);
        for (var i = 0, l = hashKeys.length; i < l; ++i) {
            // hash[ hashKeys[i] ]
            item = array[ hashKeys[i] ];
            if (Object.prototype.toString.call(item) === '[object Object]' || Object.prototype.toString.call(item) === '[object Array]') {
                iterator(item, data, callback);
            } else {
                array[ hashKeys[i] ] = callback(item, data);
            }
        }
        return array;
    }
    function callback(item, data) {
        var readyBlocksData = data;
        if (Object.prototype.toString.call(item) !== '[object Boolean]' && (item.indexOf('readyBlocksData.') + 1)) {
            eval('var m = ' + item + ';');
            return m;
        } else
            return item;
    }
    function downLevelObject(array) {
        var rezult = {};
        for (var item in array) {
            var p = array[item];
            for (i in p)
                rezult[i] = p[i];
        }
        return rezult;
    }
    function readJSON(path) {
        var dataEntry, rezult;
        try {
            dataEntry = fs.readFileSync(path, 'utf8');
        } catch (er) {
            dataEntry = false;
        }

        if (dataEntry) {
            rezult = JSON.parse(dataEntry);
        } else {
            rezult = '{}';
        }
        return rezult;
    }

    var patterns = [];
    if (!gutil.env.ie8) {
        patterns.push(
                {
                    match: '<link href="%=staticPrefix=%/css/main_ie8%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
                    replacement: ''
                }
        );
    }

    if (gutil.env.min || gutil.env.release) {
        patterns.push(
                {
                    match: '%=min=%',
                    replacement: '.min'
                }
        );
    } else {
        patterns.push(
                {
                    match: '%=min=%',
                    replacement: ''
                }
        );
    }

    if (gutil.env.release) {
        patterns.push(
                {
                    match: '%=hash=%',
                    replacement: buildOptions.hash
                }
        );
    } else {
        patterns.push(
                {
                    match: '%=hash=%',
                    replacement: ''
                }
        );
    }

    patterns.push(
            {
                match: '%=staticPrefix=%',
                replacement: tarsConfig.staticPrefixForPhp
            }
    );

    return gulp.task('html:compile-templates-for-php', function(cb) {
        var modulesData, error;

        try {
            modulesData = concatModulesData();
        } catch (er) {
            error = er;
            modulesData = false;
        }

        /** data **/
        gulp.src('./markup/pages/**/json.json')
                .pipe(jeditor(function(json) {
            var readyBlocksData = readJSON('./dev/temp/blockData.json');
            readyBlocksData = iterator(readyBlocksData, downLevelObject(readyBlocksData), callback);
            var rezult = iterator(json, downLevelObject(readyBlocksData), callback);

            return rezult;
        }
        ))
                .pipe(gulp.dest("./dev/pages/"));
        gulp.src('./markup/modules/**/data/json.json')
                .pipe(gulp.dest("./dev/modules/"));
        /** data end **/

        /** modules **/
        gulp.src([
            './markup/modules/**/*.html',
            './markup/modules/**/**/*.html'
        ])
                .pipe(replace({
            patterns: patterns,
            usePrefix: false
        }))
                .on('error', notify.onError(function(error) {
            return '\nAn error occurred while replacing placeholdres.\nLook in the console for details.\n' + error;
        }))
                .pipe(beml())
                .on('error', notify.onError(function(error) {
            return '\nAn error occurred while beml html-files.\nLook in the console for details.\n' + error;
        }))
                .pipe(gulp.dest('./dev/modules/'))
                .pipe(
                notifier('Templates modules\'ve been compiled')
                );
        /** modules end**/

        /** pages **/
        return gulp.src([
            './markup/pages/**/*.html',
            '!./markup/pages/**/_*.html',
        ])
                .pipe(replace({
            patterns: patterns,
            usePrefix: false
        }))
                .on('error', notify.onError(function(error) {
            return '\nAn error occurred while replacing placeholdres.\nLook in the console for details.\n' + error;
        }))
                .pipe(beml())
                .on('error', notify.onError(function(error) {
            return '\nAn error occurred while beml html-files.\nLook in the console for details.\n' + error;
        }))
                .pipe(gulp.dest('./dev/pages/'))
                .pipe(
                notifier('Templates pages\'ve been compiled')
                );
        /** pages end **/
    });
};
