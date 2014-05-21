/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/searchBox'
], function ($, _, Backbone, JST, SearchBox) {
    'use strict';

    var IndexView = Backbone.View.extend({
        template: JST['app/scripts/templates/index.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            var model = new Backbone.Model({
                keyword: ''
            });
            this.searchBox = new SearchBox({
                model: model
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.searchBox.setElement('#searchBox').render();
        }
    });

    return IndexView;
});