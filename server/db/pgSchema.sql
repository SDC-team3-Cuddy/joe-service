DROP DATABASE IF EXISTS rpmodule;

CREATE DATABASE rpmodule;

\c rpmodule;

CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image_url VARCHAR NOT NULL,
  overview VARCHAR,
  specifications VARCHAR,
  coverage VARCHAR,
  ratings_count INT,
  ratings_average NUMERIC(10,1)
);

CREATE TABLE IF NOT EXISTS related_products(
  product_id INT NOT NULL,
  related_id INT NOT NULL
);

-- Understand what this will do before uncommenting:
-- CREATE INDEX product_id_idx
-- ON related_products(product_id);

CREATE INDEX ON related_products (product_id);

-- Will I need to create the user first in the script?
GRANT CONNECT ON DATABASE rpmodule TO hrstudent;
GRANT USAGE ON SCHEMA public TO my_user;
GRANT ALL PRIVILEGES ON DATABASE rpmodule TO hrstudent;
GRANT ALL ON ALL TABLES IN SCHEMA public TO hrstudent;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO hrstudent;

COPY products(title, description, price, image_url, overview, specifications, coverage, ratings_count, ratings_average)
FROM '/Users/joebuono/Desktop/Coding/Hack_Reactor/sdc/Guitar-Centaur-RelatedPurchases-Service/bigData/products.csv'
DELIMITER ','
CSV HEADER;

COPY related_products(product_id, related_id)
FROM '/Users/joebuono/Desktop/Coding/Hack_Reactor/sdc/Guitar-Centaur-RelatedPurchases-Service/bigData/related_products.csv'
DELIMITER ','
CSV HEADER;

/*  Execute this file from the command line by typing:
       psql postgres < server/db/pgSchema.sql
    to create the database and the tables from within the repo.
*/

