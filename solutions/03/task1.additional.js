/* *
 * Curry function from exercise
 * */

function curryExercise(fn) {
    let len = fn.length;

    return function f() {
        let arg = Array.prototype.slice.call(arguments);
        return (arg.length < len) ? f.bind(null, ...arg) : fn.apply(null, arg);
    };
}

/* *
 *  Fat Curry version setting return function length
 * */

function curry(func, arity) {
    arity = arity || func.length;
    if(arity === 0) return func;
    return function g() {
        var args = [].slice.call(arguments);
        if(args.length === arity) return func.apply(this, arguments);
        return Object.defineProperty(function() {
            var newArgs = [].slice.call(arguments);
            return g.apply(this, args.concat(newArgs));
        }, 'length', { value: arity - args.length });
    };
}

/* *
 * And of course curry one-liner
 * If ES6 spread operator ( ... ) is not working just do it the old way (var args = [].slice.call(arguments))
 * */

var curry = fn => { var f; return (f = (...args) => args.length < fn.length ? f.bind(null, ...args) : fn.apply(null, args)); };
