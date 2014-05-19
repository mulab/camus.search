/*global require*/
/*global QUnit*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars'
    }
});

require(['../spec/env', '../spec/models'], function(env, models){
    env.run();
    models.run();
    QUnit.load();
    QUnit.start();
});