/**
 * Created by guangchen on 1/28/14.
 */
"use strict";
define(['app/model/tunet','app/model/myhome','app/model/lib','app/model/chemschool','app/model/career','app/model/common','app/model/infu','app/model_factory','app/model/result_list','app/model/query','test/fixture','underscore'],
    function (Tunet,MyHome,Lib,Chemschool,Career,Common,Infu,Factory,ResultList,Query,Fixture,_) {
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
            
            var lib = new Lib();
            strictEqual(lib.get('title'),'','Lib has title');
            strictEqual(lib.get('answer'),'','Lib has answer');
            strictEqual(lib.get('time'),'','Lib has time');
            strictEqual(lib.get('link'),'','Lib has link');
            strictEqual(lib.get('index'),'','Lib has index');
            strictEqual(lib.get('author'),'图书馆读者之声','Lib has author');

            var chemschool = new Chemschool();
            strictEqual(chemschool.get('title'),'','Chemschool has title');
            strictEqual(chemschool.get('question'),'','Chemschool has question');
            strictEqual(chemschool.get('answer'),'','Chemschool has answer');
            strictEqual(chemschool.get('time'),'','Chemschool has time');
            strictEqual(chemschool.get('link'),'','Chemschool has link');
            strictEqual(chemschool.get('index'),'','Chemschool has index');
            strictEqual(chemschool.get('author'),'化学系FAQ','Chemschool has author');
            
            var career = new Career();
            strictEqual(career.get('title'),'','Career has title');
            strictEqual(career.get('answer'),'','Career has answer');
            strictEqual(career.get('question'),'','Career has question');
            strictEqual(career.get('link'),'','Career has link');
            strictEqual(career.get('index'),'','Career has index');

            var common = new Common();
            strictEqual(common.get('title'),'','Common has title');
            strictEqual(common.get('answer'),'','Common has answer');
            strictEqual(common.get('type'),'','Common has type');
            strictEqual(common.get('link'),'','Common has link');
            strictEqual(common.get('index'),'','Common has index');
            strictEqual(common.get('author'),'','Common has author');
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

            var lib = new Lib();
            var lib_src = Fixture.Lib;
            lib.adapt_from(lib_src);
            equal(lib.get('title'),lib_src.question,'After adapting, lib has title');
            equal(lib.get('answer'),lib_src.answer,'After adapting, lib has answer');
            equal(lib.get('time'),lib_src.date,'After adapting, lib has time');
            equal(lib.get('link'),lib_src.link,'After adapting, lib has link');
            equal(lib.get('index'),lib_src.resultIndex,'After adapting, lib has index');
            equal(lib.get('author'),'图书馆读者之声','After adapting, lib has author');
            
            var chemschool = new Chemschool();
            var chemschool_src = Fixture.Chemschool;
            chemschool.adapt_from(chemschool_src);
            equal(chemschool.get('title'),chemschool_src.title,'After adapting, chemschool has title');
            equal(chemschool.get('question'),chemschool_src.question,'After adapting, chemschool has question');
            equal(chemschool.get('answer'),chemschool_src.answer,'After adapting, chemschool has answer');
            equal(chemschool.get('time'),chemschool_src.date,'After adapting, chemschool has time');
            equal(chemschool.get('link'),chemschool_src.link,'After adapting, chemschool has link');
            equal(chemschool.get('index'),chemschool_src.resultIndex,'After adapting, chemschool has index');
            equal(chemschool.get('author'),'化学系FAQ','After adapting, chemschool has author');
            
            var career = new Career();
            var career_src = Fixture.Career;
            career.adapt_from(career_src);
            equal(career.get('title'),career_src.title,'After adapting, career has title');
            equal(career.get('question'),career_src.question,'After adapting, career has question');
            equal(career.get('answer'),career_src.answer,'After adapting, career has answer');
            equal(career.get('link'),career_src.link,'After adapting, career has link');
            equal(career.get('index'),career_src.resultIndex,'After adapting, career has index');

            var common = new Common();
            var common_src = Fixture.ArtSchool;
            common.adapt_from(common_src);
            equal(common.get('title'),common_src.question,'After adapting, common has title');
            equal(common.get('type'),common_src.type,'After adapting, common has question');
            equal(common.get('answer'),common_src.answer,'After adapting, common has answer');
            equal(common.get('link'),common_src.link,'After adapting, common has link');
            equal(common.get('index'),common_src.resultIndex,'After adapting, common has index');
            equal(common.get('author'),'美院招生FAQ','After adapting, common has author');

            var infu = new Infu();
            var infu_src = Fixture.Infu;
            infu.adapt_from(infu_src);
            equal(infu.get('title'),infu_src.title,'Infu has title');
            equal(infu.get('large_url'),infu_src.largeUrl,'Infu has large url');
            equal(infu.get('photo_id'),infu_src.photoId,'Infu has photo id');
            equal(infu.get('comment_count'),infu_src.commentCount,'Infu has comment count');
            equal(infu.get('time'),infu_src.time,'Infu has time');
            equal(infu.get('author_id'),infu_src.authorId,'Infu has author id');
            equal(infu.get('author_name'),infu_src.author,'Infu has author name');
            equal(infu.get('index'),infu_src.resultIndex,'Infu has index');
            equal(_.difference(infu.get('comment_list'),infu_src.commentList).length,0,'Infu has index');
        });
        test('model factory',function(){
            equal(Factory.create(Fixture.Tunet).get('type'),'tunet','factory can create tunet model');
            equal(Factory.create(Fixture.MyHome).get('type'),'myhome','factory can create myhome model');
            equal(Factory.create(Fixture.Lib).get('type'),'lib','factory can create lib model');
            equal(Factory.create(Fixture.Chemschool).get('type'),'chemschool','factory can create lib model');
            equal(Factory.create(Fixture.Career).get('type'),'career','factory can create career model');
            equal(Factory.create(Fixture.ArtSchool).get('type'),'artschool','factory can create artschool model');
            equal(Factory.create(Fixture.Infu).get('type'),'infu','factory can create infu model');
        });
        test('result list model',function(){
            var result_list = new ResultList();
            result_list.adapt_from(Fixture.ResultList);
            equal(result_list.get('count'),Fixture.ResultList.count);
            equal(result_list.get('start'),Fixture.ResultList.start);
            equal(result_list.get('page_size'),Fixture.ResultList.size);
            console.log(result_list.toJSON());
        });
        test('query model',function(){
            var query = new Query();
            query.set({
                type:7
            });
            equal(query.serialize(),'#query/k/t7/s0');
        });
    };
    return {run:run};
});