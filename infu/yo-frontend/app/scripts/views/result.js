/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/searchBox',
    'views/resultList'
], function ($, _, Backbone, JST, SearchBox, ResultList) {
    'use strict';

    var ResultView = Backbone.View.extend({
        template: JST['app/scripts/templates/result.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

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
        }
    });

    return ResultView;
});
