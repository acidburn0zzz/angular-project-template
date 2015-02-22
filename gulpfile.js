/* Created by Vasiliy on 2/20/2015. */
/* jshint camelcase:false */
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');

var plug = require('gulp-load-plugins')({lazy : true});

var port = process.env.PORT || 7207;

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
        .src(config.lessFiles)
        .pipe(plug.plumber())
        .pipe(plug.less())
        //.on('error', errorLogger)
        .pipe(plug.autoprefixer({browser: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('less-watcher', function() {
    gulp.watch([config.lessFiles], ['styles']);
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

gulp.task('inject', ['wiredep', 'styles'], function() {
    log('Wire up the app css into the html, and call wiredep');

    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(plug.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

/**
 * List the available gulp tasks
 */
gulp.task('plugins', plug.taskListing);

/**
 * serve the dev environment
 */
gulp.task('serve-dev', function() {
    serve({
        mode: 'dev'
    });
});

////////////////////////

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

/**
 * Start the node server using nodemon.
 * Optionally start the node debugging.
 * @param  {Object} args - debugging arguments
 * @return {Stream}
 */
function serve(args) {
    var options = {
        script: config.server + 'app.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        },
        watch: [config.server]
    };

    var exec;
    if (args.debug) {
       // log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        options.nodeArgs = [args.debug + '=5858'];
    }

    log('before nodemon');
    return plug.nodemon(options)
        .on('start', function() {
            log('startBrowserSync');
            //startBrowserSync();
        })
        //.on('change', tasks)
        .on('restart', function() {
            log('restarted!');
            /*setTimeout(function () {
                browserSync.reload({ stream: false });
            }, 1000);*/
        });
}
