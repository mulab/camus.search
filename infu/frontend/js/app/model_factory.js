/**
 * Created by guangchen on 1/29/14.
 */
"use strict";
define(['app/model/career','app/model/chemschool','app/model/common','app/model/infu','app/model/lib','app/model/myhome','app/model/tunet'],
    function (Career,Chemschool,Common,Infu,Lib,Myhome,Tunet) {
    var create = function(src){
        var factory = {
            'infu':Infu,
            'artschool':Common,
            'learnfaq':Common,
            'lib':Common,
            'chemschool':Chemschool,
            'libauthor':Lib,
            'myhome':Myhome,
            'career':Career,
            'tunet':Tunet
        };
        var model = new factory[src.type]();
        model.adapt_from(src);
        return model;
    };
    return {create:create};
});