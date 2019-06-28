const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const polka = require('polka');
const send = require('@polka/send-type');
const path = require('path');
const cors = require('cors');

const serveStatic = require('serve-static');

const instream = fs.createReadStream('./data/test.txt');
// const instream = fs.createReadStream('./data/a_christmas_carol.txt');
// const instream = fs.createReadStream('./data/Charles-Dickens-A-Christmas-Carol.txt');
const outstream = new stream();
const stats = fs.statSync('./data/test.txt');

const wordList = {};
let wordListArray = [];
let lineCount = 0;

const rl = readline.createInterface(instream, outstream);

rl.on('line', line => {
  lineCount++;
  const lineArray = line.match(/[A-z]\w+/g);

  lineArray &&
    lineArray.forEach(
      l => (wordList[l.toLowerCase()] = (wordList[l.toLowerCase()] || 0) + 1)
    );
});

rl.on('close', () => {
  wordListArray = Object.entries(wordList);
  wordListArray.sort((a, b) => a[1] - b[1]);

  console.log('Object size', Object.keys(wordList).length);
  console.log('lineCount', lineCount);
  console.log('File size (MB)', stats.size * Math.pow(10, -6));
});

const twoLetters = letters => {
  const arr = wordListArray.filter(val =>
    val[0].startsWith(letters.toLowerCase())
  );
  return arr.slice(arr.length - 10, arr.length);
};

const wordLength = word => {
  const arr = wordListArray.filter(val => val[0].length === word);
  return arr.slice(arr.length - 10, arr.length);
};

polka()
  .use(cors())
  .use(serveStatic(path.join(__dirname, 'build')))
  .get('/top10wordsA/:wordLength', (req, res) => {
    let word = req.params.wordLength;

    if (isNaN(word))
      return send(res, 500, { msg: 'Input needs to be a number' });
    if (parseInt(word) < 2)
      return send(res, 500, { msg: 'Input needs to bo at least 2' });
    send(res, 200, wordLength(parseInt(word)));
  })
  .get('/top10wordsB/:twoLetters', (req, res) => {
    let letters = req.params.twoLetters;

    if (letters.length !== 2)
      return send(res, 500, { msg: 'Input needs to be 2 chars long' });
    send(res, 200, twoLetters(letters));
  })
  .get('/*', (req, res) => {
    fs.readFile(path.join(__dirname, 'build', 'index.html'), (err, file) => {
      send(res, 200, file, { 'Content-Type': 'text/html' });
    });
  })
  .listen(process.env.PORT || 3001, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3001`);
  });
