const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('mydatabase.db');

// Define API routes
app.get('/api/products', (req, res) => {
  // Retrieve and send product data from the database
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// More routes for CRUD operations (add, update, delete products) can be added here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



