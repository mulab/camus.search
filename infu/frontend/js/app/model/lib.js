/**
 * Created by guangchen on 1/28/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var Lib = Backbone.Model.extend({
        defaults:{
            title:'',
            answer:'',
            time:'',
            link:'',
            index:'',
            author:'图书馆读者之声'
        },
        adapt_from:function(src){
            this.set('title',src.question);
            this.set('answer',src.answer);
            this.set('time',src.date);
            this.set('link',src.link);
            this.set('index',src.resultIndex);
        }
    });
    return Lib;
});