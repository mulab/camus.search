/*global define*/

define([
    'underscore',
    'backbone',
    'models/infu'
], function (_, Backbone, InfuModel) {
    'use strict';

    var InfuCollection = Backbone.Collection.extend({
        model: InfuModel,
        url: function(){
            return '/search?type=infu&keywords=' + (this.keywords || '') + '&start=' + (this.start || 0) + '&size=' + (this.pageSize || 10); 
        },
        parse: function(response){
            return response;
        }
    });

    return InfuCollection;
});
