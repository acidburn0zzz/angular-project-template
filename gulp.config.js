module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';

    return {
        client: client,
        server: './src/server/',
        allJsFiles: [
            './src/**/*.js',
            './*.js'
        ],
        temp: temp,
        lessFiles: client + 'styles/styles.less',
        index: client + 'index.html',
        js: [
          clientApp + '**/*.module.js',
          clientApp + '**/*.js',
          '!' + clientApp + '**/*.spec.js'
        ],
        css: temp + 'styles.css',
        wiredepDefaultOptions: {
          bowerJson: require('./bower.json'),
          directory: './bower_components/',
          ignorePath: '../..'
        }
    };
};