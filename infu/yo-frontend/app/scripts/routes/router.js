/*global define*/

define([
    'jquery',
    'backbone',
    'collections/infu',
    'views/index',
    'views/result'
], function ($, Backbone, Infu, Index, Result) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            'query/:keywords/:type(/:start)': 'query',
            '': 'index'
        },
        index: function () {
            $('.footer').addClass('index');
            new Index({
                el: '.content',
                model: new Backbone.Model()
            }).render();
        },
        query: function (keywords, type, start) {
            $('.footer').removeClass('index');
            var infu = new Infu([], {
                keywords: keywords,
                type: type,
                start: start,
                pageSize: 10
            });
            var result = new Result({
                el: '.content',
                model: infu
            });
            infu.fetch().done(function () {
                result.render();
            });
        }

    });

    return RouterRouter;
});