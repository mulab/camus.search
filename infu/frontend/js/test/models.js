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
            notEqual(tunet.get('title'),'','After adapting, tunet has title');
            notEqual(tunet.get('answer'),'','After adapting, tunet has answer');
            notEqual(tunet.get('time'),'','After adapting, tunet has time');
            notEqual(tunet.get('link'),'','After adapting, tunet has link');
            notEqual(tunet.get('index'),'','After adapting, tunet has index');
        });
    };
    return {run:run};
});