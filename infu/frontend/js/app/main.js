/**
 * Created by guangchen on 2/1/14.
 */
"use strict";
define(['jquery','underscore','backbone','app/view/result_list','app/view/header','app/model/result_list','app/model/query','app/doctypes'],
    function ($,_,Backbone,ResultListView,HeaderView,ResultListModel,QueryModel,doctypes) {
        var query_model = new QueryModel();
        var header_view = new HeaderView({el: '.header', model: query_model});
        return Backbone.Router.extend({
            routes: {
                "": "index",
                "query/k:keywords/t:type(/s:start)": "query"
            },
            index: function () {
                header_view.render();
            },
            query: function (keywords, type, start) {
                var type_array = [];
                start = start || 0;
                _.each(doctypes.value, function (value, key) {
                    //noinspection JSBitwiseOperatorUsage
                    if (type & value)type_array.push(key);
                });
                query_model.set({
                    keywords:keywords,
                    type:type*1,
                    start:start*1
                });
                header_view.render();
                $.getJSON('/query?keywords=' + decodeURI(keywords) + '&type=' + JSON.stringify(type_array) + '&start=' + start,
                    function (data) {
                        var model = new ResultListModel();
                        model.adapt_from(data);
                        model.set('query', new QueryModel({
                            keywords: keywords,
                            type: type,
                            start: start
                        }));
                        var view = new ResultListView({
                            el: '.result-list',
                            model: model
                        });
                        view.render();
                    }
                );
            }
        });
    }
);