import csv from 'csv-parser'
import fs from 'fs'

export default async (nameFile) => await new Promise(resolve => {
    const results = [];
    fs.createReadStream(`./data/${nameFile}`)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results));
})