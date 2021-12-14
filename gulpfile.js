"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglifycss = require("gulp-uglifycss");
const sourcemaps = require("gulp-sourcemaps");

function compileSass() {
    return gulp
        .src("./app/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./app/assets/css"));
}

function minifyCSS() {
    return gulp
        .src("./app/assets/css/*.css")
        .pipe(uglifycss({ uglyComments: true }))
        .pipe(gulp.dest("./dist/"));
}

exports.default = function () {
    gulp.watch(
        "./app/scss/**/*.scss",
        { ignoreInitial: false },
        gulp.series(compileSass, minifyCSS)
    );
};
