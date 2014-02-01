/**
 * Created by guangchen on 1/31/14.
 */
"use strict";
define(['app/view/result_list','app/model/result_list','app/model/query','test/Fixture','jquery'],function (View,Model,QueryModel,Fixture,$) {
    var run = function(){
        test('result list view',function(){
            var model = new Model();
            model.adapt_from(Fixture.ResultList);
            model.set('query',new QueryModel({
                keywords:'a',
                type:7,
                start:11
            }));
            var view = new View({
                el:'#qunit-fixture',
                model:model
            });
            view.render();
            var $fixture = $('#qunit-fixture');
            console.log($fixture.html());
            notEqual($fixture.html(),'','view is rendered');
            equal($fixture.find('.result-item').length,10,'result item is correct');
            var $pagination = $fixture.find('.result-pagination');
            notEqual($pagination.html(),'','result pagination is rendered');
            notEqual($pagination.html().indexOf('上一页'),-1,'pagination has pre page');
            notEqual($pagination.html().indexOf('下一页'),-1,'pagination has next page');
            equal($pagination.find('a').length,12,'pagination rendered correctly');
        });
    };
    return {run:run};
});