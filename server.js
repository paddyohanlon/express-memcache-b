const express = require('express');
const findPrime = require('./utils/findPrime');
const migrate = require('./db/migrate');
const db = require('./db');

migrate();

const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const n = req.query.n;
  
  if (!n) {
    res.render('index');
    return;
  }
  
  const prime = findPrime(n);

  let likes = 0;

  // Get likes from the database
  const { rows } = await db.query('SELECT likes from likes WHERE n = $1', [n]);

  console.log("rows[0]", rows[0]);

  if (rows[0]) {
    likes = rows[0].likes;
  } else {
    // insert into DB
    const result = await db.query('INSERT INTO likes (n, likes) VALUES ($1, 0)', [n]);
    console.log("insert result", result);
  }

  const locals = { n, prime, likes };
  res.render('index', locals);
});

app.get('/like', async (req, res) => {
  const n = req.query.n;

  if (!n) {
    res.redirect('/');
    return;
  }
  try {

    const result = await db.query('UPDATE likes SET likes = likes + 1 WHERE n = $1', [n]);
    
    console.log("result", result);
  } catch (e) {
    console.log("e", e);
  }

  res.redirect(`/?n=${n}`);
});

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Example app is listening on port ${port}.`)
);
