/* Created by Vasiliy on 2/20/2015. */
/* jshint camelcase:false */
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');

var plug = require('gulp-load-plugins')({lazy : true});

var port = process.env.PORT || config.defaultPort;

gulp.task('help', plug.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.allJsFiles)
        .pipe(plug.if(args.verbose, plug.print()))
        .pipe(plug.jscs())
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(plug.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Less --> CSS');
    return gulp
        .src(config.lessFile)
        .pipe(plug.plumber())
        .pipe(plug.less())
        //.on('error', errorLogger)
        .pipe(plug.autoprefixer({browser: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
    log('Copying and compressing the images');
    return gulp.src(config.images)
        .pipe(plug.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function(done) {
    var delConfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + plug.util.colors.blue(delConfig));
    del(delConfig, done);
});

gulp.task('clean-fonts', function(done) {
    clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
    clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-styles', function(done) {
    clean(config.temp + '**/*.css', done);
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files, done);
});

gulp.task('less-watcher', function() {
    gulp.watch([config.lessFile], ['styles']);
});

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmlTemplates)
        .pipe(plug.minifyHtml({empty: true}))
        .pipe(plug.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');

    var options = config.wiredepDefaultOptions;
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(plug.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    log('Wire up the app css into the html, and call wiredep');

    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(plug.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject', 'fonts', 'images'], function() {
    log('Optimizing the javascript, css, html');

    var assets = plug.useref.assets({searchPath: './'});
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = plug.filter('**/*.css');
    var jsLibFilter = plug.filter('**/lib.js');
    var jsAppFilter = plug.filter('**/app.js');

    return gulp
        .src(config.index)
        .pipe(plug.plumber())
        .pipe(plug.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe(plug.csso())
        .pipe(cssFilter.restore())

        .pipe(jsLibFilter)
        .pipe(plug.uglify())
        .pipe(jsLibFilter.restore())

        .pipe(jsAppFilter)
        .pipe(plug.ngAnnotate())
        .pipe(plug.uglify())
        .pipe(jsAppFilter.restore())

        .pipe(plug.rev())// app.js --> app.lj8889jr.js
        .pipe(assets.restore())
        .pipe(plug.useref()) // parse the build blocks in the HTML, replace them and pass those files through
        .pipe(plug.revReplace())

        .pipe(gulp.dest(config.build))
        .pipe(plug.rev.manifest())
        .pipe(gulp.dest(config.build));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function() {
    var msg = 'Bumping versions';
    var type =  args.type;
    var version =  args.version;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);
    return gulp
        .src(config.packages)
        //.pipe(plug.print())
        .pipe(plug.bump(options))
        .pipe(gulp.dest(config.root));
});

gulp.task('serve-build', ['optimize'], function() {
    serve(false /* isDev */);
});

/**
 * serve the dev environment
 */
gulp.task('serve-dev', ['inject'], function() {
    serve(true /* isDev */);
});

gulp.task('test', ['vet', 'templatecache'], function(done) {
    startTests(true /* singleRun */, done);
});

////////////////////////

function serve(isDev) {

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return plug.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon: exited cleanly');
        });
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {
        gulp.watch([config.lessFile], ['styles'])
            .on('change', function(event) { changeEvent(event); });
    } else {
        gulp.watch([config.lessFile, config.js, config.htmlTemplates], ['optimize', browserSync.reload])
            .on('change', function(event) { changeEvent(event); });
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.lessFile,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}

function startTests(singleRun, done) {
    var karma = require('karma').server;
    var excludeFiles = [];

    karma.start({
        config: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        single: !!singleRun
    }, karmaCompleted);

    function karmaCompleted(karmaResult) {
        log('Karma completed!');
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}

function clean(path, done) {
    log('Cleaning: ' + plug.util.colors.blue(path));
    del(path, done);
}

function log(msg) {

    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                plug.util.log(plug.util.colors.blue(msg[item]));
            }
        }
    } else {
        plug.util.log(plug.util.colors.blue(msg));
    }
}
