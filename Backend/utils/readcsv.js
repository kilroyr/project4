const csv = require('csv-parser');
const fs = require('fs');

// Function to read CSV file and parse data
const readCSV = async (filePath) => {
    const products = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const product = {
                    name: row['name'],
                    price: row['price']
                };
                products.push(product);
            })
            .on('end', () => {
                resolve(products);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = readCSV;
