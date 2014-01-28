/**
 * Created by guangchen on 1/28/14.
 */
"use strict";
define(['app/model/tunet','test/fixture'],function (Tunet,Fixture) {
    var run = function(){
        test('load models',function(){
            var tunet = new Tunet();
            strictEqual(tunet.get('title'),'','Tunet has title');
            strictEqual(tunet.get('answer'),'','Tunet has answer');
            strictEqual(tunet.get('time'),'','Tunet has time');
            strictEqual(tunet.get('link'),'','Tunet has link');
            strictEqual(tunet.get('index'),'','Tunet has index');
        });
        test('use server data for init',function(){
            var tunet = new Tunet();
            tunet.adapt_from(Fixture.Tunet);
            equal(tunet.get('title'),Fixture.Tunet.question,'After adapting, tunet has title');
            equal(tunet.get('answer'),Fixture.Tunet.answer,'After adapting, tunet has answer');
            equal(tunet.get('time'),Fixture.Tunet.date,'After adapting, tunet has time');
            equal(tunet.get('link'),Fixture.Tunet.link,'After adapting, tunet has link');
            equal(tunet.get('index'),Fixture.Tunet.resultIndex,'After adapting, tunet has index');
        });
    };
    return {run:run};
});