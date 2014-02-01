/**
 * Created by guangchen on 1/27/14.
 */
requirejs.config({
    baseUrl: 'static/js/lib',
    paths: {
        app: '../app'
    },
    shim: {
        'backbone': {
            'deps': ['underscore','jquery'],
            'exports': 'Backbone'
        },
        'underscore': {
            'exports': '_'
        },
        'handlebars': {
            'exports': 'Handlebars'
        }
    }
});

requirejs(['jquery','underscore','backbone','handlebars','app/main'],
    function($,_,Backbone,Handlebars,App){
        console.log('Backbone#'+Backbone.VERSION);
        console.log('jquery#'+ $(this).jquery);
        console.log('underscore#'+ _.VERSION);
        console.log('handlebars#'+Handlebars.VERSION);
        var app = new App();
        Backbone.history.start();
    }
);