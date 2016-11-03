var Writable = require('stream').Writable;
var Readable = require('stream').Readable;
var fs = require('fs');

function LineReader() {
    Writable.call(this);
    this.bufferArray = [];
    this.nextCallback = null;
    this.fetchResolver = null;
    this.fetchRejector = null;
    this.leftoverString = '';
}

LineReader.prototype = Object.create(Writable.prototype);

LineReader.prototype.fetchLine = function() {
    var nextLine = this.bufferArray.shift();
    if(nextLine) return Promise.resolve(nextLine);
    return new Promise((resolve, reject) => {
        this.fetchResolver = resolve;
        this.fetchRejector = reject;
    });
};

LineReader.prototype._write = function(chunk, encoding, next) {
    var currentLine = this.leftoverString + chunk.toString();
    var currentLineArray = currentLine.split('\n');
    if(currentLineArray[currentLineArray.length - 1] !== '') this.leftoverString = currentLineArray.pop();
    this.bufferArray = currentLineArray;
    this.nextCallback = next;
    if(this.fetchResolver) this.fetchResolver(this.bufferArray.shift());
};

function LineZipper(...args) {
    Readable.call(this);
    this.readers = args.map(fileName => fs.createReadStream(fileName)).map(readStream => { 
        var lineReader = new LineReader();
        readStream.pipe(lineReader);
        return lineReader;
    });
}

LineZipper.prototype = Object.create(Readable.prototype);

LineZipper.prototype._read = function() {
    Promise.all(this.readers.map(reader => reader.fetchLine())).then(lines => {
        this.push(lines.join('\t\t\t') + '\n\n\n');
    });
};

var zipper = new LineZipper('./file1.txt', './file2.txt', './file3.txt');
zipper.pipe(process.stdout);