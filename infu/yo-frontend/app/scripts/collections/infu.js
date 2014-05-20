/*global define*/

define([
    'underscore',
    'backbone',
    'models/infu'
], function (_, Backbone, InfuModel) {
    'use strict';

    var InfuCollection = Backbone.Collection.extend({
        model: InfuModel,
        url: function () {
            return '/search?type=infu&keywords=' + this.keywords + '&start=' + this.start + '&size=' + this.pageSize;
        },
        initialize: function (models, options) {
            options = options || {};
            this.keywords = options.keywords || '';
            this.start = options.start || 0;
            this.pageSize = options.pageSize || 10;
            this.type = 'infu';
        },
        parse: function(response) {
            this.count = response.count;
            return response.result;
        }
    });

    return InfuCollection;
});