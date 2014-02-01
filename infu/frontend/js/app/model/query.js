/**
 * Created by guangchen on 1/29/14.
 */
"use strict";
define(['backbone'],function (Backbone) {
    var query = Backbone.Model.extend({
        defaults:{
            keywords:'',
            type:0,
            start:0
        },
        serialize: function () {
            return '#query/k'+encodeURI(this.get('keywords'))+'/t'+this.get('type')+'/s'+this.get('start');
        }
    });
    return query;
});