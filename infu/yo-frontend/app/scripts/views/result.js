/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/searchBox',
    'views/resultList',
    'views/resultDetail'
], function ($, _, Backbone, JST, SearchBox, ResultList, ResultDetail) {
    'use strict';

    var ResultView = Backbone.View.extend({
        template: JST['app/scripts/templates/result.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .result-item': 'showDetail'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.searchBox = new SearchBox({
                model: new Backbone.Model({
                    keyword: this.model.keywords
                })
            });
            this.resultList = new ResultList({
                model: this.model
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.searchBox.setElement('#searchBox').render();
            this.resultList.setElement('.result-list').render();
        },

        showDetail: function (event) {
            var $target = $(event.currentTarget),
                index = $target.attr('result-index'),
                model = this.model.models[index],
                view = new ResultDetail({
                    el: '.result-detail',
                    model: model
                });
            this.$el.find('.result-selected').removeClass('result-selected');
            $target.addClass('result-selected');
            view.render();
        }
    });

    return ResultView;
});