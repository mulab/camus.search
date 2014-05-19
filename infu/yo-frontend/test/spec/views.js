/*jshint qunit: true*/
/*global sinon: false*/
'use strict';
define(['views/resultList', '../fixtures/infu', 'collections/infu', 'jquery'], function (ResultList, Fixture, Infu, $) {
    return {
        run: function () {
            test('result list view', function () {
                var server = sinon.fakeServer.create();
                server.respondWith('GET', '/search?type=infu&keywords=&start=10&size=10', [200, {
                        'Content-Type': 'application/json'
                },
                    JSON.stringify({
                        result: [Fixture],
                        count: 100
                    })]);
                var infus = new Infu([], {
                    keywords: '',
                    start: 10,
                    pageSize: 10
                });
                infus.fetch();
                server.respond();
                equal(infus.length, 1);
                var view = new ResultList({
                    el: '#qunit-fixture',
                    model: infus
                });
                view.render();
                var $fixture = $('#qunit-fixture');
                notEqual($fixture.html(), '', 'view is rendered');
                equal($fixture.find('.result-item').length, 1, 'result item is correct');
                var $pagination = $fixture.find('.result-pagination');
                notEqual($pagination.html(), '', 'result pagination is rendered');
                notEqual($pagination.html().indexOf('上一页'), -1, 'pagination has pre page');
                notEqual($pagination.html().indexOf('下一页'), -1, 'pagination has next page');
                equal($pagination.find('a').length, 12, 'pagination rendered correctly');
            });
        }
    };
});