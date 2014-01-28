"use strict";
requirejs.config({
    paths:{
        'QUnit': '../bower_components/qunit/qunit/qunit'
    },
    shim:{
        'QUnit': {
            exports: 'QUnit',
            init: function(){
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

requirejs(['QUnit','test/env'],function(QUnit,env){
    env.run();
    QUnit.load();
    QUnit.start();
});