'use strict';
var addOne = x => x + 1;
var sqrt = x => x * x;
var log = console.log;

/* *
 * If ES6 spread operator ( ... ) is not working just do it the old way (var args = [].slice.call(arguments))
 * */

var compose = (...args) => val => args.reduceRight((acc, curr) => curr(acc), val);

var addOneSqrtAndPrint = compose(log, sqrt, addOne);

addOneSqrtAndPrint(1); // 4