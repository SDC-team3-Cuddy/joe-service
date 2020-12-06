const express = require('express');
const app = express();
const { getRelatedProducts, postProduct, updateProduct, deleteProduct } = require('./db/models.js');
// const path = require('path');
// const db = require('./database.js');
const conn = require('../connection.js');
// const request = require('request');

app.use(express.static(__dirname + '/../public'));

app.use(express.json());

// Get all related products for a given product id
app.get('/api/related/getrelatedpurchases/:item_id', async (req, res) => {
  try {
    let relatedProducts = await getRelatedProducts(req.params.id);
    res.status(200).send(relatedProducts.rows);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

// Post a product
app.post('/api/related/products', async (req, res) => {
  const p = req.body;
  const params = [p.title, p.description, p.price, p.image_url, p.overview, p.specifications, p.coverage, p.ratings_count, p.ratings_average];

  try {
    let productPosted = await getRelatedProducts(params);
    res.status(200).send(productPosted);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

// Update a product
app.put('/api/related/products/:id', async (req, res) => {
  const params = [req.body.ratings_average, req.params.id];
  try {
    let updatedRating = await getRelatedProducts(params);
    res.status(200).send(updatedRating);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

// Delete a product
app.delete('/api/related/products/:id', async (req, res) => {
  try {
    let deletedProduct = await getRelatedProducts(req.params.id);
    res.status(200).send(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});














// pipes bundle hosted on s3 back
// app.get('/bundle.js', (req, res) => {
//   const url = `${conn.awsUrl}bundle.js`;
//   request.get(url).pipe(res);
// });

/* Shouldn't be used in local testing proxy */
// app.get('/:item_id', (req, res) => {
//   res.sendFile(`${path.resolve(__dirname, '../', 'public')}/index.html`);
// });

// This request is made within App.jsx
app.get('/api/related/getrelatedpurchases/:item_id', (req, res) => {
  const id = req.params.item_id;
  if (id) {
    return db.getRelatedPurchases(id, (results) => {
      res.status(200).send(results);
    }, (error) => {
      res.status(401).send(error);
    });
  } else {
    res.status(401).send('Bad arguments');
  }
});

// This request is made within App.jsx
app.get('/api/related/getdetails/:item_id', (req, res) => {
  const id = req.params.item_id;
  if (id) {
    return db.getDetails(id, (results) => {
      res.status(200).send(results);
    }, (error) => {
      res.status(401).send(error);
    });
  } else {
    res.status(401).send('Bad arguments');
  }
});

// This request is made within Ratings.jsx
app.get('/api/related/getratingavg/:item_id', (req, res) => {
  const id = req.params.item_id;
  if (id) {
    // single item
    return db.getRatingAvg(id, (results) => {
      res.status(200).send(results);
    }, (error) => {
      res.status(401).send('Server error');
    });
  } else {
    res.status(401).send('Bad arguments');
  }
});

// This request is made within Ratings.jsx
app.get('/api/related/getratingcount/:item_id', (req, res) => {
  const id = req.params.item_id;
  if (id) {
    // single item
    return db.getRatingCount(id, (results) => {
      res.status(200).send(results);
    }, (error) => {
      res.status(401).send('Server error');
    });
  } else {
    res.status(401).send('Bad arguments');
  }
});

// POST


// PUT/PATCH


// DELETE


// Only for future CRUD purposes, they aren't used by the app and can be commented out if not needed
// app.get('/api/related/getitem/:item_id', (req, res) => {
//   const id = req.params.item_id;
//   if (id) {
//     // single item
//     return db.getItem(id, (results) => {
//       res.status(200).send(results);
//     }, (error) => {
//       res.status(401).send('Server error');
//     });
//   }
// });

// app.get('/api/related/getitems', (req, res) => {
//   // all items
//   return db.getItem(null, (results) => {
//     res.status(200).send(results);
//   }, (error) => {
//     res.status(401).send('Server error');
//   });
// });

// app.post('/api/related/addrelatedpurchase', (req, res) => {
//   if (req.query.pid && req.query.iid) {
//     const pid = req.query.pid;
//     const iid = req.query.iid;

//     return db.addRelatedPurchase(pid, iid, (results) => {
//       res.status(200).send(results);
//     }, (error) => {
//       res.status(401).send(error);
//     });
//   } else {
//     res.status(401).send('Bad arguments');
//   }
// });

// app.post('/api/related/deleterelatedpurchase', (req, res) => {
//   if (req.query.id) {
//     const id = req.query.id;

//     return db.getRelatedPurchases(id, (results) => {
//       res.status(200).send(results);
//     }, (error) => {
//       res.status(401).send(error);
//     });
//   } else {
//     res.status(401).send('Bad arguments');
//   }
// });

// app.post('/api/related/adddetails', (req, res) => {
//   if (req.query.iid && req.query.overview && req.query.specs && req.query.coverage) {
//     const iid = req.query.iid;
//     const overview = req.query.overview;
//     const specs = req.query.specs;
//     const coverage = req.query.coverage;

//     return db.addDetails(iid, overview, specs, coverage, (results) => {
//       res.status(200).send(results);
//     }, (error) => {
//       res.status(401).send(error);
//     });
//   } else {
//     res.status(401).send('Bad arguments');
//   }
// });

app.listen(conn.port, () => { console.log(`App listening on ${conn.port}...`) });