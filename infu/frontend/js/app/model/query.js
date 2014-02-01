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
        }
    });
    return query;
});