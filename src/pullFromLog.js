import fs from 'fs';
import path from 'path';

const readFile = (filename) => fs.readFileSync(path.resolve(filename), 'utf8');

const pullId = (regexp) => {
  const data = readFile('rep1.csv');
  const orders = [...data.matchAll(regexp)]
    .map((match) => match[1]) // получаем только номера заказов
    .filter((value, index, self) => self.indexOf(value) === index); // фильтруем уникальные значения
  console.log(orders.join('\n'));
};

pullId();

// /id:(\d+)/g id заказа
// /for order (\d+)/g; номер заказа
