const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
  host: '34.93.92.142',
  user: 'root',
  password: 'prabisha@2023',
  database: 'prabisha'
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse the request body as JSON
app.use(express.json());

// Set CORS headers to allow access from all origins and all methods
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get all contacts
app.get('/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving contacts:', err);
      res.status(500).json({ error: 'Failed to retrieve contacts' });
      return;
    }
    res.json(results);
  });
});

// Edit a contact
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;

  const query = 'UPDATE contacts SET ? WHERE id = ?';
  connection.query(query, [updatedContact, id], (err, result) => {
    if (err) {
      console.error('Error updating contact:', err);
      res.status(500).json({ error: 'Failed to update contact' });
      return;
    }
    res.json({ message: 'Contact updated successfully' });
  });
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM contacts WHERE id = ?';
  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting contact:', err);
      res.status(500).json({ error: 'Failed to delete contact' });
      return;
    }
    res.json({ message: 'Contact deleted successfully' });
  });
});

// Add a new contact
app.post('/add', (req, res) => {
  const newContact = req.body;

  const query = 'INSERT INTO contacts SET ?';
  connection.query(query, newContact, (err, result) => {
    if (err) {
      console.error('Error adding contact:', err);
      res.status(500).json({ error: 'Failed to add contact' });
      return;
    }
    res.json({ message: 'Contact added successfully' });
  });
});

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
