const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
let jsOutputDir = 'src/public/js';
let cssOutputDir = 'src/public/css';
if (mix.inProduction()) {
    jsOutputDir = 'dist/public/js';
    cssOutputDir = 'dist/public/css';
}

mix.ts('src/resources/ts/app.ts', jsOutputDir)
    .sass('src/resources/sass/app.scss', cssOutputDir);
    mix.disableNotifications();