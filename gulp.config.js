module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var server = './src/server/';

    return {
        client: client,
        server: server,
        temp: temp,

        allJsFiles: [
            './src/**/*.js',
            './*.js'
        ],
        lessFiles: client + 'styles/styles.less',
        index: client + 'index.html',
        js: [
          clientApp + '**/*.module.js',
          clientApp + '**/*.js',
          '!' + clientApp + '**/*.spec.js'
        ],
        css: temp + 'styles.css',

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