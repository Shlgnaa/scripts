import fs from 'fs';
import * as XLSX from 'xlsx/xlsx.mjs';

XLSX.set_fs(fs);
const workbook = XLSX.readFile('status.xlsx');

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const range = XLSX.utils.decode_range(sheet['!ref']);
const processStatusData = () => {
  const data = [];
  for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum += 1) {
    const row = [];
    for (let colNum = range.s.c; colNum <= range.e.c; colNum += 1) {
      const address = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
      const cell = sheet[address];
      if (cell && cell.t) {
        if (cell.t === 'n') {
          row.push(cell.v);
        } else if (cell.t === 's') {
          row.push(cell.w);
        }
      }
    }
    data.push(row);
  }
  return data
    .map((i) => `(${i.join(', ')})`)
    .join(',\n');
};

console.log(processStatusData());
