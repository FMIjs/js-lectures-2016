'use strict';

var task1 = require('./task1.js');

Function.prototype.curry = task1.curry;

function trippleSum(a, b, c) {
    return a + b + c;
}

var cTrippleSum = trippleSum.curry();

console.log(cTrippleSum(1)(2)(3)); //6