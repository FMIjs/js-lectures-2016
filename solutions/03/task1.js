'use strict';
/* *
 * Curry function from the lecture
 * */

function curryLecture(func) {
    func = func || this; //just because we are using it in task2
    var arity = func.length;
    return function g() {
        var args = [].slice.call(arguments);
        if(args.length === arity) {
            return func.apply(undefined, args);
        }
        return function() {
            var newArgs = [].slice.call(arguments);
            return g.apply(undefined, args.concat(newArgs));
        };
    };
}

/* *
 * function trippleSum(a, b, c) {
 *     return a + b + c;
 * }
 *
 * var c = curry(trippleSum);
 * c(1)(2)(3)  > 6
 * c(1,2)(3)   > 6
 * c(1)(2,3)   > 6
 * */

module.exports = {
    curry: curryLecture
};

/* *
 * Check out task1.additional.js for more awesomeness
 * */