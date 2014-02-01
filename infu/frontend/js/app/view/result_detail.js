/**
 * Created by guangchen on 2/1/14.
 */
"use strict";
define(['jquery','underscore','backbone','handlebars','text!app/template/result_detail.html'],
    function ($,_,Backbone,Handlebars,tmpl) {
        Handlebars.registerHelper('iftype',function(doctype,options){
            doctype = doctype.split(',');
            if(_.indexOf(doctype,this.type)!=-1)
                return options.fn(this);
        });
        return Backbone.View.extend({
            template:tmpl,
            render:function(){
                var view = this, rendered,
                    template = Handlebars.compile(view.template);
                var model = this.model;
                if(model.toJSON)model=model.toJSON();
                rendered = template(model);
                $(view.el).html(rendered);
                return view;
            }
        });
    }
);