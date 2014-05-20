/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchBoxView = Backbone.View.extend({
        template: JST['app/scripts/templates/searchBox.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'keydown #keyword':'onKeywordsChange',
            'change #keyword':'onKeywordsChange'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        
        onKeywordsChange: function (event) {
            var keyword = $(event.currentTarget).val();
            this.model.set('keyword',keyword);
        }
    });

    return SearchBoxView;
});
