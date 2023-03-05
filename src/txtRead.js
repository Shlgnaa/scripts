import fs from 'fs';
import path from 'path';

const readFile = (filename) => fs.readFileSync(path.resolve(filename), 'utf8');

const makeUpdate = () => {
  const file = readFile('txt')
    .replace(/,/g, '')
    .split('\n')
    .map((line) => `(${line.split('\t').join(', ')})`)
    .join(',\n');
  console.log(file);
};

makeUpdate();
