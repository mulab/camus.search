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
                'change #keyword':'onKeywordsChange',
                'change input[type="checkbox"]':'onDoctypeChange'
            },
            onKeywordsChange:function(event){
                var keywords = $(event.currentTarget).val();
                this.model.set('keywords',keywords);
                $('#btn-query',this.el).attr('href','#query/k'+this.model.get('keywords')+'/t'+this.model.get('type'));
            },
            onDoctypeChange:function(event){
                var type = this.model.get('type'),
                    $target = $(event.currentTarget),
                    value = $target.val(),
                    checked = $target.prop('checked');
                if(value==0){
                    $('input',this.el).prop('checked',checked);
                    this.model.set('type',0);
                }else{
                    if(checked){
                        type+=(value*1);
                        type = type % (Math.pow(2, _.size(doctypes.value))-1);
                        if(type==0)
                            $('input[value="0"],this.el').prop('checked',true);
                        this.model.set('type',type);
                    }
                    else{
                        type-=(value*1);
                        if(type<0)type+=(Math.pow(2, _.size(doctypes.value))-1);
                        $('input[value="0"]',this.el).prop('checked',false);
                        this.model.set('type',type);
                    }
                }
                $('#btn-query',this.el).attr('href','#query/k'+this.model.get('keywords')+'/t'+this.model.get('type'));
            }
        });
    }
);