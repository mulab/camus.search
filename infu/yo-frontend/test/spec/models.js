/*jshint qunit: true*/
'use strict';
define(['../lib/models/infu', '../fixtures/infu'], function (Infu, InfuFixture) {
    return {
        run: function () {
            test('load models', function () {
                var infu = new Infu({id: 0});
                strictEqual(infu.get('title'), '', 'infu has title');
            });
            test('data parse', function () {
                var server = sinon.fakeServer.create();
                server.respondWith('GET', '/infu/0', [200, {
                        'Content-Type': 'application/json'
                },
                    JSON.stringify(InfuFixture)]);
                var infu = new Infu({id: 0});
                infu.fetch();
                server.respond();
                equal(infu.get('title'), InfuFixture.title, 'parse title');
            });
        }
    };
});