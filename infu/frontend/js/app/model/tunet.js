/**
 * Created by guangchen on 1/28/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var Tunet = Backbone.Model.extend({
        defaults:{
            title:'',
            answer:'',
            time:'',
            link:'',
            index:'',
            type:'tunet'
        },
        adapt_from:function(src){
            this.set('title',src.question);
            this.set('answer',src.answer);
            this.set('time', src.date);
            this.set('link',src.link);
            this.set('index',src.resultIndex);
        }
    });
    return Tunet;
});