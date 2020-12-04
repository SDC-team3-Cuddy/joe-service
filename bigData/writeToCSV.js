const path = require('path');
const fs = require('fs');

const { writeCSV } = require('./writeStream.js');
const { insertProduct, insertRelatedProducts } = require('./generateBigData.js');

console.log('Starting to write information to CSV files...');
console.time();

// --------------------------- WRITE PRODUCTS --------------------------- //

const numProducts = 100;
const productsFilePath = path.join(__dirname, '/products.csv');
const productsStream = fs.createWriteStream(productsFilePath, {flags: 'a'});

// Columns
const productColumns = 'title,description,price,image_url,overview,specifications,coverage,ratings_count,ratings_average\n';
productsStream.write(productColumns, 'utf-8');

// Data
writeCSV(productsStream, numProducts, insertProduct, 'utf-8', () => { productsStream.end(); });


// ----------------------- WRITE RELATED PRODUCTS ---------------------- //

const relatedFilePath = path.join(__dirname, '/related_products.csv');
const relatedStream = fs.createWriteStream(relatedFilePath, {flags: 'a'});

// Columns
const relatedProductColumns = 'product_id,related_id\n';
relatedStream.write(relatedProductColumns, 'utf-8');

// Data
writeCSV(relatedStream, numProducts, insertRelatedProducts, 'utf-8', () => {
  console.log('Finished writing to CSV files!');
  console.timeEnd();
  relatedStream.end();
});
