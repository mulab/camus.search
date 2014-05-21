/*jshint qunit: true*/
/*global sinon: false*/
'use strict';
define(['models/infu', '../fixtures/infu', 'collections/infu'], function (Infu, InfuFixture, InfuCollection) {
    return {
        run: function () {
            test('load models', function () {
                var infu = new Infu({
                    id: 0
                });
                strictEqual(infu.get('title'), '', 'infu has title');
            });
            test('data parse', function () {
                var server = sinon.fakeServer.create();
                server.respondWith('GET', '/infu/0', [200, {
                        'Content-Type': 'application/json'
                },
                    JSON.stringify(InfuFixture)]);
                var infu = new Infu({
                    id: 0
                });
                infu.fetch();
                server.respond();
                equal(infu.get('title'), InfuFixture.title, 'parse title');
            });
            test('collection', function () {
                var server = sinon.fakeServer.create();
                server.respondWith('GET', '/search?type=infu&keywords=a&start=0&size=10', [200, {
                        'Content-Type': 'application/json'
                },
                    JSON.stringify({
                        result: [InfuFixture],
                        count: 100
                    })]);
                var infus = new InfuCollection([], {
                    keywords: 'a'
                });
                infus.fetch();
                server.respond();
                equal(infus.length, 1);
                equal(infus.at(0).get('title'), InfuFixture.title, 'parse title');
            });
        }
    };
});