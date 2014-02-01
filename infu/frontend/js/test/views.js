/**
 * Created by guangchen on 1/31/14.
 */
"use strict";
define(['app/view/result_list','app/view/result_detail','app/model/result_list','app/model/query','app/model_factory','test/Fixture','jquery'],
        function (ResultListView,ResultDetailView,ResultListModel,QueryModel,factory,Fixture,$) {
        var run = function(){
            test('result list view',function(){
                var model = new ResultListModel();
                model.adapt_from(Fixture.ResultList);
                model.set('query',new QueryModel({
                    keywords:'a',
                    type:7,
                    start:11
                }));
                var view = new ResultListView({
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
            test('result detail view-infu',function(){
                var model = factory.create(Fixture.Infu);
                var view = new ResultDetailView({
                    el:'#qunit-fixture',
                    model:model
                });
                view.render();
                var $fixture = $('#qunit-fixture');
                console.log($fixture.html());
                notEqual($fixture.html(),'','result detail view is rendered');
            });
            test('result detail view-lib',function(){
                var model = factory.create(Fixture.Lib);
                var view = new ResultDetailView({el:'#qunit-fixture',model:model});
                view.render();
                var $fixture = $('#qunit-fixture');
                notEqual($('.result-title',$fixture).html(),'');
                notEqual($('.result-answer',$fixture).html(),'');
            });
            test('result detail view-chemschool',function(){
                var model = factory.create(Fixture.Chemschool);
                var view = new ResultDetailView({el:'#qunit-fixture',model:model});
                view.render();
                var $fixture = $(view.el);
                notEqual($('.result-title',$fixture).html(),'');
                notEqual($('.result-time',$fixture).html(),'');
                notEqual($('.result-question',$fixture).html(),'');
                notEqual($('.result-answer',$fixture).html(),'');
            });
            test('result detail view-myhome',function(){
                var model = factory.create(Fixture.MyHome);
                var view = new ResultDetailView({el:'#qunit-fixture',model:model});
                view.render();
                var $fixture = $(view.el);
                notEqual($('.result-title',$fixture).html(),'');
                notEqual($('.result-question',$fixture).html(),'');
            });
            test('result detail view-career',function(){
                var model = factory.create(Fixture.MyHome);
                var view = new ResultDetailView({el:'#qunit-fixture',model:model});
                view.render();
                var $fixture = $(view.el);
                notEqual($('.result-title',$fixture).html(),'');
                notEqual($('.result-question',$fixture).html(),'');
                notEqual($('.result-answer',$fixture).html(),'');
            });
            test('result detail view-tunet',function(){
                var model = factory.create(Fixture.Tunet);
                var view = new ResultDetailView({el:'#qunit-fixture',model:model});
                view.render();
                var $fixture = $(view.el);
                notEqual($('.result-title',$fixture).html(),'');
                notEqual($('.result-time',$fixture).html(),'');
                notEqual($('.result-answer',$fixture).html(),'');
            });
        };
        return {run:run};
        }
);