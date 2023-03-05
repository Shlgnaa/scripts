import fs from 'fs';
import path from 'path';

const readFile = (filename) => fs.readFileSync(path.resolve(filename), 'utf8');

const addDriver = (file) => {
  const reg = (str) => str.replace(/ /g, ',').replace(/[0-9]/g, '');
  const csvHeader = 'CompanyName,Occupation,LastName,FirstName,MiddleName,Phone,PersonalNr,TerminalPassword';
  const data = readFile(file).split('\n');
  const terminalPassword = data
    .slice(1)
    .join()
    .replace(/\D+/g, ' ')
    .split(' ')
    .filter((i) => i.trim());
  const firstStr = data[0].split(',');
  firstStr[2] = firstStr[2].replace(/ /g, ','); // Замена пробелов ФИО на запятые
  const { 0: companyName, 1: occupation } = firstStr;
  const obj = {
    companyName,
    occupation,
    emptyStr: '',
  };
  const result = data
    .slice(1)
    .map((i, t) => `${Object.values(obj)}${reg(i)}${','.repeat(1)}${terminalPassword[t] ?? ','}${','}${1}`)
    .join('\n');
  return `${csvHeader}${'\n'}${firstStr.join()}${'\n'}${result}`;
};
process.stdout.write(addDriver('driverData'));
