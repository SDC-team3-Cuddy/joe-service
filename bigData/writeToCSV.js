const path = require('path');
const fs = require('fs');

const { writeCSV } = require('./writeStream.js');
const { insertProduct, insertRelatedProducts, insertMongoProduct } = require('./generateBigData.js');

console.log('Starting to write information to CSV files...');
console.time();


// --------------------------- Write CSV file for 'products' table for Postgres --------------------------- //

const numProducts = 10000000;
const productsFilePath = path.join(__dirname, '/products.csv');
const productsStream = fs.createWriteStream(productsFilePath, {flags: 'a'});

// Columns
const productColumns = 'title,description,price,image_url,overview,specifications,coverage,ratings_count,ratings_average\n';
productsStream.write(productColumns, 'utf-8');

// Data
writeCSV(productsStream, numProducts, insertProduct, 'utf-8', () => { productsStream.end(); });


// ----------------------- Write CSV file for 'related products' table for Postgres ---------------------- //

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

/*
// --------------------------- Write CSV file for 'products' for MongoDB --------------------------- //

console.log('Starting to write Mongo CSV file...');
console.time();

const numProducts = 10000000;
const productsFilePath = path.join(__dirname, '/mongoProducts.csv');
const productsStream = fs.createWriteStream(productsFilePath);

// Columns
const productColumns = 'productId,title,description,price,imageUrl,overview,specifications,coverage,ratingsCount,ratingsAverage,relatedProducts\n';
productsStream.write(productColumns, 'utf-8');

// Data
writeCSV(productsStream, numProducts, insertMongoProduct, 'utf-8', () => {
  console.timeEnd();
  console.log('Finished writing to Mongo CSV file!');
  productsStream.end();
});

*/
