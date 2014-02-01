/**
 * Created by guangchen on 1/30/14.
 */
"use strict";
define(['jquery','backbone','handlebars','text!app/template/result_list.html'],
    function ($,Backbone,Handlebars,tmpl) {
        Handlebars.registerHelper('isInfu', function(options){
            if(this.type == 'infu'){
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        });
        Handlebars.registerHelper('pageList', function(options){
            var ret = "",current=this.current,max=this.max,query=this.query,page_size=this.page_size,
                start=current-5,end=current+ 4,i;
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
            for(i=start;i<=end;i++){
                this.pageNum=(i==current)?i:'['+i+']';
                this.current = (i==current)?'current':'';
                this.pageLink = '#query/k'+query.get('keywords')+'/t'+query.get('type')+'/s'+(i-1)*page_size;
                ret+=options.fn(this);
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
                        current_page = parseInt(start/page_size) + 1,
                        pagination = {};
                    if(current_page > 1)pagination.pre = true;
                    if(current_page < max_page)pagination.next = true;
                    pagination.current = current_page;
                    pagination.max = max_page;
                    pagination.page_size = page_size;
                    pagination.query = model.query;
                    model.pagination = pagination;
                    return model;
                })());
                $(view.el).html(rendered);
                return view;
            }
        });
});