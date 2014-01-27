/**
 * Created by guangchen on 1/27/14.
 */
var fs = require('fs');
var path = fs.realpathSync('.');
module.exports = [
    {
        pattern: 'static/js/lib/require.js',
        responder: path+'/bower_components/requirejs/require.js'
    },
    {
        pattern: 'static/js/app.js',
        responder: path+'/js/app.js'
    },
    {
        pattern: 'static/js/lib/jquery.js',
        responder: path+'/bower_components/jquery/jquery.js'
    },
    {
        pattern: 'static/js/lib/underscore.js',
        responder: path+'/bower_components/underscore/underscore.js'
    },
    {
        pattern: 'static/js/lib/backbone.js',
        responder: path+'/bower_components/backbone/backbone.js'
    },
    {
        pattern: 'static/js/lib/handlebars.js',
        responder: path+'/bower_components/handlebars/handlebars.js'
    }
];