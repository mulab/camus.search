/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'handlebars'
], function ($, _, Backbone, JST, Handlebars) {
    'use strict';

    Handlebars.registerHelper('pageList', function (options) {
        var ret = '',
            current = this.current,
            max = this.max,
            pageSize = this.pageSize,
            start = current - 5,
            end = current + 4,
            i, data = {};
        if (start <= 0) {
            end = end - start + 1;
            start = 1;
        }
        if (end > max) {
            start = start - end + max;
            end = max;
        }
        if (start <= 0) {
            start = 1;
        }
        if (current > 1) {
            data.pageNum = '上一页';
            data.pageLink = '#query/' + this.keywords + '/' + this.type + '/' + (current - 2) * pageSize;
            ret += options.fn(data);
        }
        for (i = start; i <= end; i++) {
            data.pageNum = (i === current) ? i : '[' + i + ']';
            data.current = (i === current) ? 'current' : '';
            data.pageLink = '#query/' + this.keywords + '/' + this.type + '/' + (i - 1) * pageSize;
            ret += options.fn(data);
        }
        data = {};
        if (current < max) {
            data.pageNum = '下一页';
            data.pageLink = '#query/' + this.keywords + '/' + this.type + '/' + (current) * pageSize;
            ret += options.fn(data);
        }
        return ret;
    });

    var ResultListView = Backbone.View.extend({
        template: JST['app/scripts/templates/resultList.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var model = this.model;
            this.$el.html(this.template({
                count: model.count,
                models: model.toJSON(),
                pagination: {
                    current: parseInt(model.start / model.pageSize) + 1,
                    max: parseInt((model.count-1)/model.pageSize) + 1,
                    pageSize: model.pageSize,
                    keywords: model.keywords,
                    type: model.type
                }
            }));
        }
    });

    return ResultListView;
});