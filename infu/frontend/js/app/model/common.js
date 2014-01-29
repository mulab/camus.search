/**
 * Created by guangchen on 1/29/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var Common = Backbone.Model.extend({
        defaults:{
            title:'',
            answer:'',
            link:'',
            index:'',
            type:''
        },
        adapt_from:function(src){
            this.set('title',src.question);
            this.set('answer',src.answer);
            this.set('link',src.link);
            this.set('index',src.resultIndex);
            this.set('type',src.type);
        }
    });
    return Common;
});