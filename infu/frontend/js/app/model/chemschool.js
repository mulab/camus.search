/**
 * Created by guangchen on 1/29/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var Chemschool = Backbone.Model.extend({
        defaults:{
            title:'',
            question:'',
            answer:'',
            time:'',
            link:'',
            index:'',
            author:'化学系FAQ',
            type:'chemschool'
        },
        adapt_from:function(src){
            this.set('title',src.title);
            this.set('question',src.question);
            this.set('answer',src.answer);
            this.set('time',src.date);
            this.set('link',src.link);
            this.set('index',src.resultIndex);
        }
    });
    return Chemschool;
});