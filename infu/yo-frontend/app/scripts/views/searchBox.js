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
            'keyup #keyword': 'onKeywordsChange',
            'change #keyword': 'onKeywordsChange'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },

        onKeywordsChange: function (event) {
            if (event.isTrigger && event.keycode) { // used in test for simulate
                this.$('#keyword').val(this.$('#keyword').val()+String.fromCharCode(event.keycode)) ;
            }
            event.stopPropagation();
            var keyword = this.$('#keyword').val();
            this.$('#btn-query').attr('href', '#query/' + keyword + '/infu');
        }
    });

    return SearchBoxView;
});