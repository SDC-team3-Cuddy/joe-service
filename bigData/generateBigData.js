const fs = require('fs');
const { titles, descriptions, prices, image_urls, overviews, specs, coverages, ratingCounts, ratingAverages } = require('./fakeData.js');

const insertProduct = (index) => {
  const title = titles[Math.floor(Math.random() * 1000)];
  const description = descriptions[Math.floor(Math.random() * 1000)];
  const price = prices[Math.floor(Math.random() * 1000)];
  const image_url = image_urls[Math.floor(Math.random() * 50)];;
  const overview = overviews[Math.floor(Math.random() * 1000)];
  const specifications = specs[Math.floor(Math.random() * 1000)];
  const coverage = coverages[Math.floor(Math.random() * 1000)];
  const ratings_count = ratingCounts[Math.floor(Math.random() * 1000)];
  const ratings_average = ratingAverages[Math.floor(Math.random() * 100)];

  return `${title},${description},${price},${image_url},${overview},${specifications},${coverage},${ratings_count},${ratings_average}\n`;
};

const insertMongoProduct = (index, lines) => {
  const productId = lines - index + 1;
  const title = titles[Math.floor(Math.random() * 1000)];
  const description = descriptions[Math.floor(Math.random() * 1000)];
  const price = prices[Math.floor(Math.random() * 1000)];
  const imageUrl = image_urls[Math.floor(Math.random() * 50)];;
  const overview = overviews[Math.floor(Math.random() * 1000)];
  const specifications = specs[Math.floor(Math.random() * 1000)];
  const coverage = coverages[Math.floor(Math.random() * 1000)];
  const ratingsCount = ratingCounts[Math.floor(Math.random() * 1000)];
  const ratingsAverage = ratingAverages[Math.floor(Math.random() * 100)];
  const relatedProducts = [];
  const numberOfRelatedProducts = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < numberOfRelatedProducts; i++) {
    relatedProducts.push(Math.floor(Math.random() * lines) + 1);
  }

  return `${productId},${title},${description},${price},${imageUrl},${overview},${specifications},${coverage},${ratingsCount},${ratingsAverage},"[${relatedProducts}]"\n`;
};

const insertRelatedProducts = (i, lines) => {
  const productId = lines - i + 1;
  let relatedProducts = '';
  // Each product can be related to 1-10 number of other products
  const numberOfRelatedProducts = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < numberOfRelatedProducts; i++) {
    relatedProducts += `${productId},${Math.floor(Math.random() * lines) + 1}\n`;
  }

  return relatedProducts;
};

module.exports = {
  insertProduct,
  insertRelatedProducts,
  insertMongoProduct
};


