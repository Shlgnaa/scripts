import fs from 'fs';
import path from 'path';

const readFile = (filename) => fs.readFileSync(path.resolve(filename), 'utf8');

const regexp = (str) => str
  .replace(/,/g, '\n') // меняем все , на \n
  .replace(/\r?\n/g, "','")
  .split(',')
  .map((i) => `${i},`)
  .join('\n')
  .replace(/\s/g, '') // убираем все пробелы
  .replace(/,\s*$/, '') // убираем последнюю запятую
  .replace(/\r?\n/g, '') // убираем все \n
  .replace(/((.+?,){3})/g, '$1\n'); // ставим \n после каждой 3 запятой

const getIn = () => {
  const file = readFile('inData')
    .split('\n')
    .reduce((prev, cur) => (prev.indexOf(cur) === -1 ? [...prev, cur] : prev), [])
    .join(',');
  console.log(`'${regexp(file)}'`);
};
getIn();
