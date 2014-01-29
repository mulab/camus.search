/**
 * Created by guangchen on 1/28/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var MyHome = Backbone.Model.extend({
        defaults:{
            title:'',
            question:'',
            answers:[],
            link:'',
            index:'',
            type:'myhome'
        },
        adapt_from:function(src){
            this.set('title',src.title);
            this.set('question',src.question);
            this.set('answers',src.answer);
            this.set('link',src.link);
            this.set('index',src.resultIndex);
        }
    });
    return MyHome;
});