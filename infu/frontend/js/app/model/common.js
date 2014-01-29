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
            type:'',
            author:''
        },
        adapt_from:function(src){
            this.set('title',src.question);
            this.set('answer',src.answer);
            this.set('link',src.link);
            this.set('index',src.resultIndex);
            this.set('type',src.type);
            var authors = {
                'artschool':'美院招生FAQ',
                'learnfaq':'网络学堂FAQ',
                'lib':'图书馆咨询台'
            };
            this.set('author',authors[src.type]);
        }
    });
    return Common;
});