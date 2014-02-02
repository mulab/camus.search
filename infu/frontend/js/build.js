/**
 * Created by guangchen on 2/1/14.
 */
({
    baseUrl: '.',
    mainConfigFile:'app.js',
    out:'require.js',
    name:'app.js',
    paths:{
        'QUnit': '../bower_components/qunit/qunit/qunit',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/underscore/underscore',
        'jquery': '../bower_components/jquery/jquery',
        'handlebars': '../bower_components/handlebars/handlebars',
        'text': '../bower_components/requirejs-text/text',
        'app': './app',
        'requireLib': '../bower_components/requirejs/require'
    },
    include:'requireLib'
})