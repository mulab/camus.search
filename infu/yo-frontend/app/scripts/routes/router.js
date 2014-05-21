/*global define*/

define([
    'jquery',
    'backbone',
    'collections/infu',
    'views/searchBox'
], function ($, Backbone, Infu, SearchBox) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            'query/:keywords/:type(/:start)': 'query',
            '': 'index'
        },
        index: function () {
            var searchBox = new SearchBox({
                el: '#searchBox',
                model: new Backbone.Model({
                    keyword: ''
                })
            });
            searchBox.render();
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