1.Напишете функция curry, която взима дадена функция f като аргумент и ни връща нова функция, чрез която частично можем да прилагаме f.
Пример:
```js
function trippleAdd(a, b, c) {
    return a + b + c;
}

cTrippleAdd = curry(trippleAdd);

console.log(cTrippleAdd(1)(2)(3)); //6
console.log(cTrippleAdd(1, 2)(3)); //6
console.log(cTrippleAdd(1, 2, 3)); //6
```
2.Вместо да извикваме curry с аргумент функцията в-у която искаме да я приложим направете я директно да можем да я извикваме от самата функция.
Пример:
```js
var cTrippleAdd = trippleAdd.curry();
```
curry трябва да може да се извика от абсолютно всяка функция, която си създадем.

3.Напишете функция compose която ни прави композиция от n на брой функции.
Пример:
```js
var addOne = (x) => x + 1;
var sqrt = (x) => x * x;
var log = (x) => console.log(x);

addOneSqrtAndPrint = compose(log, sqrt, addOne);

addOneSqrtAndPrint(1); // 4
```
4.Напишете функция combine, която комбинира подадените и функции, и конкатенира резултата в string.
Пример:
```js
var getFullName = combine(prop('firstName'), prop('lastName'));

var arr = [{ firstName: 'Ivan', lastName: 'Ivanov'},{ firstName: 'Petko', lastName: 'Perkov'},{ firstName: 'Alexander', lastName: 'Alexandrov'}];

console.log(arr.map(getFullName)); //[ 'Ivan Ivanov', 'Petko Perkov', 'Alexander Alexandrov' ]
```
5.Напишете контейнер Promis, който взима като аргумент функция която с 2 аргумента - resolve, reject. В тази функция извършваме async операции и когато операцията завърши успешно извикваме resolve с или без данни в зависимост от операцията, а при грешка извикваме reject с грешката. Освен това нека контейтера има метод then, който взима функция която се set-ва на вътрешно свойство resolve. Също имаме и за catch за reject. Искаме да имаме възможност да навръзваме нашите Promis контейнери и когато се извика resolve от началния контейнер последователно да се извикват и другите функции.

5.1.Направете then да може да взима функция която връща Promis (т.е async операция) и да се закача към веригата.

Примери:
```js
var fs = require('fs');

function asyncOp() {
    return new Promis(function(resolve, reject) {
        setTimeout(function() {
            resolve(2000);
        }, 5000);
    });
}

asyncOp.then((x) => console.log(x)) //2000

asyncOp.then(x => x + 1).then((x) => console.log(x)) //2001
```
