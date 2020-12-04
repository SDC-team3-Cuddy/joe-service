const faker = require('faker');
const conn = require('../connection.js');

// Limits the number of calls to faker

const titles = [];
for (let i = 0; i < 1000; i++) {
  titles.push(faker.commerce.productName().replace(/,/g, ''));
}

const descriptions = [];
for (let i = 0; i < 1000; i++) {
  descriptions.push(faker.random.words(Math.floor(Math.random() * 10) + 5).replace(/,/g, ''));
}

const prices = [];
for (let i = 0; i < 1000; i++) {
  prices.push(faker.commerce.price());
}

const image_urls = [];
for (let i = 1; i <= 50; i++) {
  image_urls.push(`${conn.awsUrl}images/${i}.jpg`);
}

const overviews = [];
for (let i = 0; i < 1000; i++) {
  overviews.push(faker.random.words(Math.floor(Math.random() * 5) + 5).replace(/,/g, ''));
}

const specs = [];
for (let i = 0; i < 1000; i++) {
  specs.push(faker.random.words(Math.floor(Math.random() * 15) + 5).replace(/,/g, ''));
}

const coverages = [];
for (let i = 0; i < 1000; i++) {
  coverages.push(faker.random.words(Math.floor(Math.random() * 10) + 5).replace(/,/g, ''));
}

const ratingCounts = [];
for (let i = 0; i < 1000; i++) {
  ratingCounts.push(Math.floor(Math.random() * 1000));
}

const ratingAverages = [];
for (let i = 0; i < 100; i++) {
  ratingAverages.push((Math.round(Math.random() * 50) / 10));
}

const categories = [];
for (let i = 0; i < 100; i++) {
  categories.push(faker.commerce.department());
}

console.log(categories);

module.exports = {
  titles,
  descriptions,
  prices,
  image_urls,
  overviews,
  specs,
  coverages,
  ratingCounts,
  ratingAverages,
  categories
};