/**
 * Created by guangchen on 1/29/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var Infu = Backbone.Model.extend({
        defaults:{
            title:'',
            large_url:'',
            photo_id:'',
            comment_count:'',
            time:'',
            author_id:'',
            author_name:'',
            index:'',
            comment_list:[]
        },
        adapt_from:function(src){
            this.set('title',src.title);
            this.set('large_url',src.largeUrl);
            this.set('photo_id',src.photoId);
            this.set('comment_count',src.commentCount);
            this.set('time',src.time);
            this.set('author_id',src.authorId);
            this.set('author_name',src.author);
            this.set('index',src.resultIndex);
            this.set('comment_list',src.commentList);
        }
    });
    return Infu;
});