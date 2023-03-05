import fs from 'fs';
import path from 'path';

const readFile = (filename) => fs.readFileSync(path.resolve(filename), 'utf8');

const update = () => {
  const query = readFile('withData')
    .replace(/,/g, '.')
    .split('\n')
    .map((i) => {
      const [eshopId, amount] = i.split(/\s+/g);
      return `update [Exchange_DAX_Letu].[dbo].[tblATGtoAxaptaHead] set AmountPurch = '${amount}', AmountFull = '${amount}'
where RequestType = 'processRequest' and GETDATE() > '2023-03-03 11:00:00.000' and EShopId = '${eshopId}'\n`;
    })
    .join('\n');
  console.log(query);
};

update();

const updateDiff = () => {
  const query = readFile('withData')
    .replace(/,/g, '.')
    .split('\n')
    .map((i) => {
      const [eshopId, amount] = i.split(/\s+/g);
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 3);
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 23)
        .replace('T', ' ');
      return `update [Exchange_DAX_Letu].[dbo].[tblATGtoAxaptaHead] set AmountPurch = '${amount}', AmountFull = '${amount}'
where RequestType = 'processRequest' and '${formattedDate}' > '2023-03-03 11:00:00.000' and EShopId = '${eshopId}'\n`;
    })
    .join('\n');
  console.log(query);
};

updateDiff();
