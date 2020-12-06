const { pg } = require('./index.js');

const getRelatedProducts = async (id) => {
  console.log('inside getRelated Products------')
  const query = `
    SELECT
    p.title,
    p.description,
    p.price,
    p.image_url,
    p.overview,
    p.specifications,
    p.coverage,
    p.ratings_count,
    p.ratings_average
    FROM related_products AS rp
    INNER JOIN products AS p
    ON p.id = rp.related_id
    WHERE rp.product_id = $1;
  `;

  let relatedProducts;

  try {
    relatedProducts = await pg.query(query, [id]);
  } catch (error) {
    console.log(error);
    throw (error);
  }

  return relatedProducts;
};

const postProduct = async (params) => {
  const query = 'INSERT INTO products(title, description, price, image_url, overview, specifications, coverage, ratings_count, ratings_average) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9';

  let posted;

  try {
    posted = await pg.query(query, params);
  } catch (error) {
    console.log(error);
    throw (error);
  }

  return posted;
};

const updateProduct = async (updatedAvgRating, id) => {
  return pg('products')
  .where('id', id)
  .update({
    ratings_average: updatedAvgRating
  });
  // const query = 'UPDATE products SET ratings_average = $1 WHERE id = $2';
  // let updated;
  // try {
  //   updated = await pg.query(query, params);
  // } catch (error) {
  //   console.log(error);
  //   throw (error);
  // }
  // return updated;
};

const deleteProduct = async (id) => {
  return pg('products')
  .where('id', id)
  .del();
  // const query = 'DELETE FROM products WHERE id = $1';
  // let deleted;
  // try {
  //   deleted = await pg.query(query, [id])
  // } catch (error) {
  //   console.log(error);
  //   throw (error);
  // }
  // return deleted;
};

module.exports = {
  getRelatedProducts,
  postProduct,
  updateProduct,
  deleteProduct
};
