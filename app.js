const fs = require('fs');
const readline = require('readline');
var stream = require('stream');

const instream = fs.createReadStream('./data/test.txt');
const outstream = new stream();

const wordList = {};
let lineCount = 0;

const rl = readline.createInterface(instream, outstream);

rl.on('line', (line) => {
    lineCount++;
    const lineArray = line.split(' ');

    lineArray.forEach(l => {
        if(wordList.hasOwnProperty(l)) {
            wordList[l] += 1;
        } else {
            wordList[l] = 1;
        }
    })

})

rl.on('close', () => {
    // console.log(wordList);
    console.log('Object size', Object.keys(wordList).length);
    console.log('lineCount', lineCount);
})