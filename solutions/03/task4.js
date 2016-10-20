'use strict';
var prop = name => obj => obj[name];

/* *
 * If ES6 spread operator ( ... ) is not working just do it the old way (var args = [].slice.call(arguments))
 * */

var combine = (...args) => x => args.map((func) => func(x)).join(' ');

var getFullName = combine(prop('firstName'), prop('lastName'));

var arr = [{ firstName: 'Ivan', lastName: 'Ivanov'},{ firstName: 'Petko', lastName: 'Petkov'},{ firstName: 'Alexander', lastName: 'Alexandrov'}];

console.log(arr.map(getFullName));