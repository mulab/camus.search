/**
 * Created by guangchen on 1/31/14.
 */
"use strict";
define(['underscore','backbone','app/model_factory'],function (_,Backbone,factory) {
    var result_list = Backbone.Model.extend({
        defaults:{
            count:'',
            result:[],
            start:0,
            page_size:10
        },
        adapt_from:function(src){
            this.set('count',src.count);
            var adapt_result = [];
            _.each(src.result,function(item){
                adapt_result.push(factory.create(item).toJSON());
            });
            this.set('result',adapt_result);
            this.set('start',src.start || 0);
            this.set('page_size',src.size || 10);
        }
    });
    return result_list;
});