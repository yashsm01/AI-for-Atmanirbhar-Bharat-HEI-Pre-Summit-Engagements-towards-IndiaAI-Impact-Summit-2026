const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load data into memory
let database = [];
fs.createReadStream(path.join(__dirname, 'data.csv'))
  .pipe(csv())
  .on('data', (row) => {
    database.push(row);
  })
  .on('end', () => {
    console.log('CSV data loaded successfully.');
  });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/predict', (req, res) => {
  const { crop, month } = req.query;
  
  const result = database.find(
    (item) => item.crop === crop && item.month === month
  );

  if (result) {
    res.json(result);
  } else {
    res.json({ 
      error: "Data not available for this combination.",
      historical_demand: "N/A",
      price_trend: "N/A",
      recommendation: "Try searching for Tomato in June or Wheat in November."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
