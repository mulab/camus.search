/**
 * Created by guangchen on 1/31/14.
 */
"use strict";
define(['app/view/result_list','app/model/result_list','test/Fixture','jquery'],function (View,Model,Fixture,$) {
    var run = function(){
        test('result list view',function(){
            var model = new Model();
            model.adapt_from(Fixture.ResultList);
            var view = new View({
                el:'#qunit-fixture',
                model:model
            });
            view.render();
            var $fixture = $('#qunit-fixture');
            console.log($fixture.html());
            notEqual($fixture.html(),'','view is rendered');
            equal($fixture.find('.result-item').length,10,'result item is correct');
        });
    };
    return {run:run};
});