"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));
const uglifycss = require("gulp-uglifycss");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

function compileSass() {
    return gulp
        .src("./app/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./app/assets/css"));
}

function processCSS() {
    return gulp
        .src("./app/assets/css/*.css")
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(uglifycss({ uglyComments: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/"));
}

function compileJS() {
    return gulp
        .src("./app/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist/js"));
}

exports.default = gulp.parallel(
    function watchSCSS() {
        gulp.watch(
            "./app/scss/**/*.scss",
            { ignoreInitial: false },
            gulp.series(compileSass, processCSS)
        );
    },
    function watchJS() {
        gulp.watch("./app/js/**/*.js", { ignoreInitial: false }, compileJS);
    }
);
