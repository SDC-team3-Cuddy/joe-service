var pg = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'hrstudent',
    password: '1234',
    database: 'rpmodule'
  }
});

module.exports = { pg };


/*

CRUD Operations

SELECT p.id, p.title
FROM related_products AS rp
INNER JOIN products AS p
ON p.id = rp.related_id
WHERE rp.product_id = 3;

  3 |     186814
  3 |    8883443
  3 |    8366638
  3 |    7181129
  3 |    8741398
  3 |    7691102
  3 |    4218260


INSERT INTO products(title, description, price, image_url, overview, specifications, coverage, ratings_count, ratings_average) VALUES('Mug', 'Big', 123.45, 'http://www.bigcoffeemugs.com', 'Really big coffee mug', 'Seriously huge', 'Occupies a tremendous amount of space', 1, 5);

SELECT * FROM products WHERE id = 1234567;

UPDATE products SET ratings_average = 5 WHERE id = 7654321;

DELETE FROM products WHERE id = 112233;

*/