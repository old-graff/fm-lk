var gulp = require('gulp');
var notify = require('gulp-notify');
var del = require('del');
var tarsConfig = require('../../../tars-config');

module.exports = function (buildOptions) {
    del(tarsConfig.buildPath + '/stable', function () {
    });
    return gulp.task('service:stable-version', function () {
        return gulp.src(buildOptions.buildPath + '/**/*.*')
            .pipe(gulp.dest(tarsConfig.buildPath + '/stable/'))
    });
}