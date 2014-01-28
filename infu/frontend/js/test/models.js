/**
 * Created by guangchen on 1/28/14.
 */
"use strict";
define(['app/model/tunet','app/model/myhome','test/fixture','underscore'],function (Tunet,MyHome,Fixture,_) {
    var run = function(){
        test('load models',function(){
            var tunet = new Tunet();
            strictEqual(tunet.get('title'),'','Tunet has title');
            strictEqual(tunet.get('answer'),'','Tunet has answer');
            strictEqual(tunet.get('time'),'','Tunet has time');
            strictEqual(tunet.get('link'),'','Tunet has link');
            strictEqual(tunet.get('index'),'','Tunet has index');
            
            var my_home = new MyHome();
            strictEqual(my_home.get('title'),'','MyHome has title');
            equal(_.difference(my_home.get('answers'),[]).length,0,'After adapting, my_home has answer');
            strictEqual(my_home.get('question'),'','MyHome has question');
            strictEqual(my_home.get('link'),'','MyHome has link');
            strictEqual(my_home.get('index'),'','MyHome has index');
        });
        test('use server data for init',function(){
            var tunet = new Tunet();
            tunet.adapt_from(Fixture.Tunet);
            equal(tunet.get('title'),Fixture.Tunet.question,'After adapting, tunet has title');
            equal(tunet.get('answer'),Fixture.Tunet.answer,'After adapting, tunet has answer');
            equal(tunet.get('time'),Fixture.Tunet.date,'After adapting, tunet has time');
            equal(tunet.get('link'),Fixture.Tunet.link,'After adapting, tunet has link');
            equal(tunet.get('index'),Fixture.Tunet.resultIndex,'After adapting, tunet has index');
            
            var my_home = new MyHome();
            my_home.adapt_from(Fixture.MyHome);
            equal(my_home.get('title'),Fixture.MyHome.title,'After adapting, my_home has title');
            equal(_.difference(my_home.get('answers'),Fixture.MyHome.answer).length,0,'After adapting, my_home has answer');
            equal(my_home.get('question'),Fixture.MyHome.question,'After adapting, my_home has time');
            equal(my_home.get('link'),Fixture.MyHome.link,'After adapting, my_home has link');
            equal(my_home.get('index'),Fixture.MyHome.resultIndex,'After adapting, my_home has index');
        });
    };
    return {run:run};
});