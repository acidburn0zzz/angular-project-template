module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var server = './src/server/';

    return {
        client: client,
        server: server,
        temp: temp,
        build: './build/',

        allJsFiles: [
            './src/**/*.js',
            './*.js'
        ],
        lessFile: client + 'styles/styles.less',
        index: client + 'index.html',
        js: [
          clientApp + '**/*.module.js',
          clientApp + '**/*.js',
          '!' + clientApp + '**/*.spec.js'
        ],
        css: temp + 'styles.css',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        images: client + 'images/**/*.*',
        htmlTemplates: clientApp + '**/*.html',

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
        * Bower and NPM locations
        */
        wiredepDefaultOptions: {
          bowerJson: require('./bower.json'),
          directory: './bower_components/',
          ignorePath: '../..'
        },

        /**
        * Node settings
        */
        defaultPort: 7207,
        nodeServer: server + 'app.js'
    };
};