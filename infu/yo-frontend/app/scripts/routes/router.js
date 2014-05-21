/*global define*/

define([
    'jquery',
    'backbone',
    'collections/infu',
    'views/index'
], function ($, Backbone, Infu, Index) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            'query/:keywords/:type(/:start)': 'query',
            '': 'index'
        },
        index: function () {
            new Index({
                el: '.content',
                model: new Backbone.Model()
            }).render();
        },
        query: function (keywords, type, start) {
            var infu = new Infu({
                keywords: keywords,
                type: type,
                start: start,
                pageSize: 10
            });
            infu.fetch();
        }

    });

    return RouterRouter;
});