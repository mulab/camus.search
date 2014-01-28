"use strict";
requirejs.config({
    paths:{
        'QUnit': '../bower_components/qunit/qunit/qunit',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/underscore/underscore',
        'jquery': '../bower_components/jquery/jquery'
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
        }
    }
});

requirejs(['QUnit','test/env','test/models'],function(QUnit,env,models){
    env.run();
    models.run();
    QUnit.load();
    QUnit.start();
});