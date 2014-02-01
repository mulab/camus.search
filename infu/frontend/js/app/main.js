/**
 * Created by guangchen on 2/1/14.
 */
"use strict";
define(['jquery','underscore','backbone','app/view/result_list','app/model/result_list','app/model/query'],
    function ($,_,Backbone,ResultListView,ResultListModel,QueryModel) {
        var doctypes = {
            'infu':1,
            'artschool':2,
            'learnfaq':4,
            'lib':8,
            'chemschool':16,
            'libauthor':32,
            'myhome':64,
            'career':128,
            'tunet':256
        };
        var AppRouter = Backbone.Router.extend({
            routes:{
                "query/k:keywords/t:type/s:start":"query"
            },
            query:function(keywords,type,start){
                var type_array = [];
                _.each(doctypes,function(value,key){
                    //noinspection JSBitwiseOperatorUsage
                    if(type & value)type_array.push(key);
                });
                $.getJSON('/query?keywords='+decodeURI(keywords)+'&type='+JSON.stringify(type_array)+'&start='+start,
                    function(data){
                        var model = new ResultListModel();
                        model.adapt_from(data);
                        model.set('query',new QueryModel({
                            keywords:keywords,
                            type:type,
                            start:start
                        }));
                        var view = new ResultListView({
                            el:'.result-list',
                            model:model
                        });
                        view.render();
                    }
                );
            }
        });
        return AppRouter;
    }
);