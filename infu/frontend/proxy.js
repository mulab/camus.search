/**
 * Created by guangchen on 1/27/14.
 */
var fs = require('fs');
var path = fs.realpathSync('.');
module.exports = [
    {
        pattern: 'localhost:8000/static/require.js',
        responder: path+'/bower_components/requirejs/require.js'
    }
];