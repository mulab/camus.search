/**
 * Created by guangchen on 1/28/14.
 */
"use strict";
define(function(){
    var run = function(){
        test('test framework is ok.',function(){
            ok(true,'true');
        });
    };
    return {run:run};
});