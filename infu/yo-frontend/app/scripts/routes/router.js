/*global define*/

define([
    'jquery',
    'backbone',
    'collections/infu'
], function ($, Backbone, Infu) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'query/:keywords/:type(/:start)': 'query',
            index: function () {},
            query: function (keywords, type, start) {
                var infu = new Infu({
                    keywords: keywords,
                    type: type,
                    start: start,
                    pageSize: 10
                });
                infu.fetch();
            }
        }

    });

    return RouterRouter;
});