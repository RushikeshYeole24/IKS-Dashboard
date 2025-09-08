const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: '1234', // your MySQL password
  database: 'iks'       // your database name
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// API endpoint to fetch data
app.get('/absentee_data', (req, res) => {
  db.query('SELECT * FROM absentee_data', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
