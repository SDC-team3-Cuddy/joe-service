const { pg } = require('./index.js');

const getRelatedProducts = async (id) => {
  return pg.select('*').from('products')
    .join('related_products', 'products.id', '=', 'related_products.related_id')
    .where('related_products.product_id', id)
};

const postProduct = async (p) => {
  return pg('products').insert({
    title: p.title,
    description: p.description,
    price: p.price,
    image_url: p.image_url,
    overview: p.overview,
    specifications: p.specifications,
    coverage: p.coverage,
    ratings_count: p.ratings_count,
    ratings_average: p.ratings_average
  })
};

const updateProduct = async (updatedAvgRating, id) => {
  return pg('products').where('id', id)
    .update({ ratings_average: updatedAvgRating })
};

const deleteProduct = async (id) => {
  return pg('products').where('id', id).del();
};

module.exports = {
  getRelatedProducts,
  postProduct,
  updateProduct,
  deleteProduct
};


/*

Old queries (before refactoring to us Knex.js)

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

const query = 'INSERT INTO products(title, description, price, image_url, overview, specifications, coverage, ratings_count, ratings_average) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9';

const query = 'UPDATE products SET ratings_average = $1 WHERE id = $2';

const query = 'DELETE FROM products WHERE id = $1';

*/