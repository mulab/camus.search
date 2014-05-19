/*global test*/
/*global ok*/
'use strict';
define(function(){
    var run = function(){
        test('test framework is ok.',function(){
            ok(true,'true');
        });
    };
    return {run:run};
});