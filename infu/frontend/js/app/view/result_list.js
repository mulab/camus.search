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
        var ResultList = Backbone.View.extend({
            template:tmpl,
            render:function(){
                var view = this, rendered;
                var template = Handlebars.compile(view.template)
                rendered = template(view.model.toJSON());
                $(view.el).html(rendered);
                return view;
            }
        });
        return ResultList;
});