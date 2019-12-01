const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const list = require('./googleApps');

app.use(morgan('dev'));
app.use(cors());

app.get('/app', (req, res) => {
  let { search = "", sort, genre} = req.query;

  const apps = list;

  sort = sort.toLowerCase();
  

  if(sort) {
    if(!["rating", "app"].includes(sort)) {
      res
        .status(400)
        .send('sort can only be rating or app')
    }
  }

  if(genre) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card','action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genre)) {
      res
        .status(400)
        .send("please pick only from the following genres Action, Puzzle, Strategy, Casual, Arcade, Card")
    }
  }

  const results = apps
    .filter(app => app
      .Genres
      .toLowerCase()
      .includes(genre.toLowerCase())
    );

  if(sort) {
    results
      .sort((a,b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }

  res.json(results)
})

// app.listen(8000, () => {
//   console.log('google app is listening')
// })

module.exports = app;