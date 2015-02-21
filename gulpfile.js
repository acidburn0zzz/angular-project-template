/* Created by Vasiliy on 2/20/2015. */
/* jshint camelcase:false */
var gulp = require('gulp');
var args = require('yargs').argv;
var paths = require('./gulp.config.json');

var plug = require('gulp-load-plugins')({lazy : true});

var port = process.env.PORT || 7207;

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(paths.alljs)
        .pipe(plug.if(args.verbose, plug.print()))
        .pipe(plug.jscs())
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(plug.jshint.reporter('fail'));
});

/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);

/**
 * serve the dev environment
 */
gulp.task('serve-dev', function() {
    serve({
        mode: 'dev'
    });
});

////////////////////////

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
        script: paths.server + 'app.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        },
        watch: [paths.server]
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
