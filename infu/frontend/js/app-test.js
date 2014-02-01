"use strict";
requirejs.config({
    paths:{
        'QUnit': '../bower_components/qunit/qunit/qunit',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/underscore/underscore',
        'jquery': '../bower_components/jquery/jquery',
        'handlebars': '../bower_components/handlebars/handlebars',
        'text': '../bower_components/requirejs-text/text'
    },
    shim:{
        'QUnit': {
            exports: 'QUnit',
            init: function(){
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        'backbone': {
            'deps': ['underscore','jquery'],
            'exports': 'Backbone'
        },
        'underscore':{
            'exports': '_'
        },
        'handlebars':{
            'exports': 'Handlebars'
        }
    }
});

requirejs(['QUnit','test/env','test/models','test/views'],function(QUnit,env,models,views){
    env.run();
    models.run();
    views.run();
    QUnit.load();
    QUnit.start();
});