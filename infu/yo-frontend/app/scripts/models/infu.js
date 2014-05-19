/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var InfuModel = Backbone.Model.extend({
        url: '',

        initialize: function () {},

        defaults: {
            title: '',
            largeUrl: '',
            photoId: '',
            commentCount: '',
            time: '',
            authorId: '',
            authorName: '',
            index: '',
            commentList: [],
            type: 'infu'
        },

        parse: function (response) {
            return {
                title: response.title,
                largeUrl: response.largeUrl,
                photoId: response.photoId,
                commentCount: response.commentCount,
                time: response.time,
                authorId: response.authorId,
                authorName: response.author,
                index: response.resultIndex,
                commentList: response.commentList
            };
        }
    });

    return InfuModel;
});