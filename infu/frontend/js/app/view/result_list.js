/**
 * Created by guangchen on 1/30/14.
 */
"use strict";
define(['jquery','backbone','handlebars','text!app/template/result_list.html','app/view/result_detail'],
    function ($,Backbone,Handlebars,tmpl,ResultDetailView) {
        Handlebars.registerHelper('isInfu', function(options){
            if(this.type == 'infu'){
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        Handlebars.registerHelper('pageList', function(options){
            var ret = "",current=this.current,max=this.max,query=this.query,page_size=this.page_size,
                start=current-5,end=current+ 4, i,data={};
            if(start<=0){
                end=end-start+1;
                start=1;
            }
            if(end>max){
                start=start-end+max;
                end=max;
            }
            if(start<=0){
                start=1;
            }
            if(current>1){
                data.pageNum='上一页';
                data.pageLink = '#query/k'+query.get('keywords')+'/t'+query.get('type')+'/s'+(current-2)*page_size;
                ret+=options.fn(data);
            }
            for(i=start;i<=end;i++){
                data.pageNum=(i==current)?i:'['+i+']';
                data.current = (i==current)?'current':'';
                data.pageLink = '#query/k'+query.get('keywords')+'/t'+query.get('type')+'/s'+(i-1)*page_size;
                ret+=options.fn(data);
            }
            data={};
            if(current<max){
                data.pageNum='下一页';
                data.pageLink = '#query/k'+query.get('keywords')+'/t'+query.get('type')+'/s'+(current)*page_size;
                ret+=options.fn(data);
            }
            return ret;
        });
        return Backbone.View.extend({
            template: tmpl,
            render: function () {
                var view = this, rendered,
                    template = Handlebars.compile(view.template);
                rendered = template((function(){
                    var model = view.model.toJSON(),
                        start = model.start,
                        page_size = model.page_size,
                        count = model.count,
                        max_page = parseInt((count-1)/page_size) + 1,
                        pagination = {};
                    pagination.current = parseInt(start / page_size) + 1;
                    pagination.max = max_page;
                    pagination.page_size = page_size;
                    pagination.query = model.query;
                    model.pagination = pagination;
                    return model;
                })());
                $(view.el).html(rendered);
                return view;
            },
            events:{
                'click .result-item':'showDetail'
            },
            showDetail:function(event){
                var $target = $(event.currentTarget),
                    index = $target.attr('result-index'),
                    model = this.model.get('result')[index],
                    view = new ResultDetailView({el:'.result-detail',model:model});
                $('.result-selected',this.el).removeClass('result-selected');
                $target.addClass('result-selected');
                view.render();
            }
        });
});