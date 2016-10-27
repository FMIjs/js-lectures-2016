var fs = require('fs');

/*TASK 1*/

var readFile = path => new Promise((resolve, reject) => {
    fs.readFile(path, function(err, data) {
        if(err) return reject(err);
        resolve(data);
    });
});

var writeFile = path => data => new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
        if(err) return reject(err);
        resolve(data);
    });
});

var studentsFile = () => readFile('./students.txt');
var marksFile = () => readFile('./marks.txt');
var creditsFile = () => readFile('./credits.txt');
var calculateCredit = (total, studentMark) => studentMark === 2.0 ? 0 :  (total * studentMark) / 6;
var stringify = data => data.toString();

var splitLines = data => data.split('\n');
var splitEmptySpaces = data => data.split(/\s/g);

var parseStudents = () => studentsFile()
    .then(stringify)
    .then(splitLines)
    .then(studentsArray => studentsArray.reduce((acc, student) => { 
        var studentArr = splitEmptySpaces(student); 
        acc[studentArr[2]] = `${studentArr[0]}  ${studentArr[1]}`;
        return acc; 
    }, {}));

var parseMarks = () => marksFile()
    .then(stringify)
    .then(splitLines)
    .then(lineArray => lineArray.reduce((acc, line) => {
            var currentLineArray = splitEmptySpaces(line);
            acc[currentLineArray[0]] = currentLineArray.slice(1);
            return acc;
    }, {}));

var parseCredits = () => creditsFile()
    .then(stringify)
    .then(splitLines)
    .then(data => data.map(line => splitEmptySpaces(line)))
    .then(data => data[0].reduce((acc, curr, index) => { 
        acc[curr] = data[1][index];
        return acc;
    }, {}));


Promise.all([parseStudents(), parseMarks(), parseCredits()]).then(([students, marks, credits]) => {
    var subjects = Object.keys(credits);
    return Object.keys(students).map(key => {
        var obj = {
            name: students[key]
        };
        subjects.map((subject, index) => {
            obj[subject] = calculateCredit(credits[subject], marks[key][index]).toFixed(2);
        });
        return JSON.stringify(obj);
    }).toString();
}).then(writeFile('./results.txt')).catch(console.error);

/* TASK 2 (Without saving to file) */

var generator = function*() {
    var students = yield parseStudents();
    var marks = yield parseMarks();
    var credits = yield parseCredits();
    var subjects = Object.keys(credits);
    return Object.keys(students).map(key => {
        var obj = {
            name: students[key]
        };
        subjects.map((subject, index) => {
            obj[subject] = calculateCredit(credits[subject], marks[key][index]).toFixed(2);
        });
        return JSON.stringify(obj);
    }).toString();

};

function calculate(generator) {
    var gen = generator();
    function next(result) {
        if(result instanceof Promise) {
            result.then(data => { 
                next(gen.next(data).value); 
            });
        }
        else console.log(result);
    }
    next(gen.next().value);
}

calculate(generator);
