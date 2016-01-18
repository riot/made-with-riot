'use strict';


// Importing modules

let gulp         =  require('gulp'),
    minifycss    =  require('gulp-minify-css'),
    uglify       =  require('gulp-uglify'),
    rename       =  require('gulp-rename'),
    notify       =  require('gulp-notify'),
    autoprefixer =  require('gulp-autoprefixer'),
    concat       =  require('gulp-concat'),
    sass         =  require('gulp-sass'),
    babel        =  require('gulp-babel'),
    riot         =  require('gulp-riot'),
    runSequence  =  require('run-sequence'),
    connect      =  require('gulp-connect'),
    svgstore     =  require('gulp-svgstore'),
    svgmin       =  require('gulp-svgmin'),
    ghPages      =  require('gulp-gh-pages'),
    path         =  require('path'),
    del          =  require('del');


// Setting base paths
// (you can edit at will but remember to change system folders accordingly)

let opts = {
    path: {
           assets: 'src',
   riotComponents: 'src/js/tags',
        promiseJs:'node_modules/promise-polyfill/Promise.js',
               js: 'src/js',
           styles: 'src/styles',
            views: 'src/views',
           images: 'src/img',
             data: 'src/data',

             dist: 'dist',
           distJs: 'dist/js',
          distCss: 'dist/css',
         distData: 'dist/data',
       distImages: 'dist/img',
  distJsGenerated: 'dist/js/generated',
    genComponents: 'dist/js/components/generated',
    },
    messages: {
           stylesCompiled: 'Styles compiled.',
          scriptsCompiled: 'JS compiled.',
             htmlCompiled: 'HTML compiled.',
           imagesCompiled: 'Images compiled.',
             riotCompiled: 'Riot Tags compiled.',
              allCompiled: 'Compiling finished.',
             dataCompiled: 'Data JSON compiled.',
              appDeployed: 'App successful deployed.',
              shitHappens: 'Shit happens. Check log.'
    },
         basename: 'all',
        minSuffix: '.min',
      debugSuffix: '.debug',
    lineSeparator: "\n\n//-----\n\n"
};


// Function responsible for error handling

function handleError(err) {
    console.log(err);
    this.emit('end');
}


// Gulp tasks

gulp.task('compile:styles', ['clean:styles'], () => {
    return gulp.src([
            opts.path.styles + '/**/*.scss',
            opts.path.styles + '/**/*.css'
        ])
        .pipe(sass())

        .on('error', handleError)

        .pipe(autoprefixer('last 5 version'))
        .pipe(concat(opts.basename + '.css'))
        .pipe(rename({suffix: opts.debugSuffix}))
        .pipe(gulp.dest(opts.path.distCss))
        .pipe(rename({basename: opts.basename, suffix: opts.minSuffix}))

        // Give you machine a break, enable this only for production
        .pipe(minifycss())

        .pipe(gulp.dest(opts.path.distCss))
        .pipe(notify({message: opts.messages.stylesCompiled}));
});

gulp.task('compile:images', ['compile:svg'], () => {
    return gulp.src([
            opts.path.images + '/**',
            'resources/**'
        ])
        .pipe(gulp.dest(opts.path.distImages))
        .pipe(notify({message: opts.messages.imagesCompiled}));
});

gulp.task('compile:svg', () => {
    return gulp.src(opts.path.images + '/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename({basename: 'all.min', extname: '.svg'}))
        .pipe(gulp.dest(opts.path.distImages))
});

gulp.task('compile:js', () => {
    return gulp.src([
            opts.path.promiseJs,
            opts.path.js + '/**/*.js',
            opts.path.distJsGenerated + '/**/*.js',
            opts.path.genComponents + '/*.js'
        ])

        .on('error', handleError)

        .pipe(concat(opts.basename + '.js', {newLine: opts.lineSeparator}))
        .pipe(rename({suffix: opts.debugSuffix}))
        .pipe(gulp.dest(opts.path.distJs))

        // Give you machine a break, enable this only for production
        .pipe(uglify())

        .pipe(rename({basename: opts.basename, suffix: opts.minSuffix}))
        .pipe(gulp.dest(opts.path.distJs))
        .pipe(notify({message: opts.messages.scriptsCompiled}));
});

gulp.task('compile:riot', () => {
    return gulp.src(opts.path.riotComponents + '/*.tag.html')
        .pipe(riot())

        .on('error', handleError)

        .pipe(gulp.dest(opts.path.genComponents))
        .pipe(notify({message: opts.messages.riotCompiled}));
});

gulp.task('compile:data', () => {
    return gulp.src(opts.path.data + '/*.json')
        .pipe(gulp.dest(opts.path.distData))
        .pipe(notify({message: opts.messages.dataCompiled}));
});



gulp.task('compile:scripts', (cb) => {
    runSequence(
        'clean:scripts',
        'clean:data',
        'compile:riot',
        'compile:js',
        'compile:data',
        cb
    );
});

gulp.task('compile:html', ['clean:html'], () => {
    return gulp.src(opts.path.assets + '/app.html')
        .pipe(rename({basename: 'index'}))
        .pipe(gulp.dest(opts.path.dist))
        .pipe(notify({message: opts.messages.htmlCompiled}));
});

gulp.task('compile:all', ['compile:styles', 'compile:scripts', 'compile:html', 'compile:images'], () => {
    return notify({message: opts.messages.allCompiled});
});

gulp.task('clean:styles', (cb) => {
    return del(opts.path.distCss, cb);
});

gulp.task('clean:scripts', (cb) => {
    return del(opts.path.distJs, cb);
});

gulp.task('clean:html', (cb) => {
    return del(opts.path.dist + '/*.html', cb);
});

gulp.task('clean:data', (cb) => {
    return del(opts.path.distData + '/*.json', cb);
});

gulp.task('lift', () => {
    connect.server({
        root: opts.path.dist,
        port: 8000
    });
});

gulp.task('deploy', () => {
    return gulp.src(opts.path.dist + '/**/*')
        .pipe(ghPages());
});


// Gulp watchers

gulp.task('watch:all', () => {
    gulp.watch([opts.path.assets + '/styles/**/*.scss', opts.path.assets + 'styles/**/*.css'], ['compile:styles']);
    gulp.watch([opts.path.assets + '/js/**/*.js', opts.path.assets + '/js/**/*.tag.html'], ['compile:scripts']);
    gulp.watch([opts.path.images + '/**', 'resources/**'], ['compile:images']);
    gulp.watch([opts.path.assets + '/app.html'], ['compile:html']);
});
