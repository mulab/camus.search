var host = 'http://localhost:9000/';
module.exports = [
    {
        pattern: 'styles/main.css',
        responder: host + 'styles/main.css'
    },
    {
        pattern: /http:\/\/localhost:8000\/bower_components\/(.*)/,
        responder: host + 'bower_components/$1'
    },
    {
        pattern: /scripts\/(.*)/,
        responder: host + 'scripts/$1'
    }
];
