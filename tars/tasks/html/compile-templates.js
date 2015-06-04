var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var beml = require('gulp-beml');
var tarsConfig = require('../../../tars-config');
var replace = require('gulp-replace-task');
var notifier = require('../../helpers/notifier');
var browserSync = require('browser-sync');
var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var through2 = require('through2');

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
    function concatModulesData() {
        var readyBlocksData, readyPagesData, json = {};
        readyBlocksData = readJSON('./dev/temp/blockData.json');
        readyPagesData = readJSON('./dev/temp/pageData.json');

        readyBlocksData = iterator(readyBlocksData, downLevelObject(readyBlocksData), callback);
        json = iterator(readyPagesData, downLevelObject(readyBlocksData), callback);
        return downLevelObject(json);
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
                replacement: tarsConfig.staticPrefix
            }
    );

    return gulp.task('html:compile-templates', function(cb) {
        var modulesData, error;

        try {
            modulesData = concatModulesData();
        } catch (er) {
            error = er;
            modulesData = false;
        }
        return gulp.src(['./markup/pages/**/*.html', '!./markup/pages/**/_*.html'])
                .pipe(
                modulesData
                ? handlebars(modulesData, handlebarsOptions)
                : through2.obj(
                function() {
                    console.log(gutil.colors.red('An error occurred with data-files!'));
                    this.emit('error', error);
                }
        )
                )
                .on('error', notify.onError(function(error) {
            return '\nAn error occurred while compiling handlebars.\nLook in the console for details.\n' + error;
        }))
                .on('error', function() {
            this.emit('end');
        })
                .pipe(replace({
            patterns: patterns,
            usePrefix: false
        }))
                .on('error', notify.onError(function(error) {
            return '\nAn error occurred while replacing placeholdres.\nLook in the console for details.\n' + error;
        }))
                .pipe(beml())
                .pipe(gulp.dest('./dev/'))
                .pipe(browserSync.reload({stream: true}))
                .pipe(
                notifier('Templates\'ve been compiled')
                );
    });
};
