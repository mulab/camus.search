/**
 * Created by guangchen on 1/29/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var Career = Backbone.Model.extend({
        defaults:{
            title:'',
            question:'',
            answer:'',
            link:'',
            index:'',
            type:'career'
        },
        adapt_from:function(src){
            this.set('title',src.title);
            this.set('question',src.question);
            this.set('answer',src.answer);
            this.set('link',src.link);
            this.set('index',src.resultIndex);
        }
    });
    return Career;
});