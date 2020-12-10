var pg = require('knex')({
  client: 'pg',
  connection: {
    host: '3.129.59.107', // change this to EC2 database instance address (instead of localhost 127.0.0.1) 3.129.59.107
    port: 5432,
    user: 'hrstudent',
    password: '1234',
    database: 'rpmodule'
  }
});

module.exports = { pg };

/*

Step 1: See if you can connect your local service to your EC2 database instance








// From Michael Chen:
1. Create a PostgreSQL security group rule for port 5432 (should be in the dropdown menu!)
2. In your DB instance, set password:
sudo -u postgres psql
postgres=#\password
  (will be prompted for password)
3. Edit pg_hba.conf AND postgresql.conf
sudo vim /etc/postgresql/12/main/pg_hba.conf
# Near bottom of file after local rules, add rule (allows remote access):
host    all             all             0.0.0.0/0               md5
sudo vim /etc/postgresql/12/main/postgresql.conf
# Change line 59 to listen to external requests:
listen_address='*'
4. Restart postgres
sudo /etc/init.d/postgresql restart
5. Connect from private network!
sudo psql -h PRIVATEIP -U postgres
sudo psql -h 3.129.59.107 -d rpmodule -U hrstudent


Postgres is usually exposed on port :5432

The queries will remain on your service

Your EC2 has to be able to allow communication on a port

Open up ports on EC2, and also open up Postgres settings

Postgres has settings inside a config file that tell what can connect to it
- By default, it's only 127.0.0.1
- You'll have to get inside the config file and edit it so that anybody can connect to it(open all ports)

rsync (or sftp, it's Secure File Transfer Protocol)
- Basically drag and drop the files from one computer to another



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