import fs from 'fs';
import path from 'path';

const readFile = (filename) => fs.readFileSync(path.resolve(filename), 'utf8');

const updateCoordintes = () => {
  const query = readFile('makeUpdateData')
    .replace(/,/g, '.')
    .split('\n') // деление на апдейты
    .map((i) => {
      const [shippingGroupId, latitude, longitude] = i.split(/\s+/g);
      return `UPDATE letu_shipping_group
SET latitude = '${latitude}', longitude = '${longitude}'
WHERE shipping_group_id = '${shippingGroupId}'\n`;
    })
    .join('\n');
  console.log(query);
};

updateCoordintes();
