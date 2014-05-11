/**
 * Created by guangchen on 1/27/14.
 */
"use strict";
define(['underscore','handlebars','backbone','text!app/template/header.html','app/doctypes'],
    function(_,Handlebars,Backbone,tmpl,doctypes){
        Handlebars.registerHelper('doctype',function(options){
            var ret='',
                data = {text:'all',value:0,checked:this.type==0?'checked':''},
                context = this;
            ret += options.fn(data);
            _.each(doctypes.value,function(value,key){
                data.text=doctypes.text[key];
                data.value=value;
                //noinspection JSBitwiseOperatorUsage
                if(context.type==0||(context.type&value))data.checked='checked';
                else data.checked='';
                ret += options.fn(data);
            });
            return ret;
        });
        return Backbone.View.extend({
            template:tmpl,
            render:function(){
                var view = this, rendered,
                    template = Handlebars.compile(view.template),
                    model = this.model.toJSON();
                if(model.keywords!='')model.link='query/k'+model.keywords;
                if(model.type!=0)model.link+='/t'+model.type;
                rendered = template(model);
                $(view.el).html(rendered);
                return view;
            },
            events:{
                'keydown #keyword':'onKeywordsChange',
                'change #keyword':'onKeywordsChange'
            },
            onKeywordsChange:function(event){
                var keywords = $(event.currentTarget).val();
                this.model.set('keywords',keywords);
                $('#btn-query',this.el).attr('href','/search#query/k'+this.model.get('keywords')+'/t'+'1');
            }
        });
    }
);