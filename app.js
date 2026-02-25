const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const { getConnection } = require('./database');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to get all thoughts
app.get('/', (req, res) => {
    getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM thoughts', (err, results) => {
            connection.release();
            if (err) throw err;
            res.render('index', { thoughts: results });
        });
    });
});

// Route to add a new thought
app.post('/add', (req, res) => {
    const { content } = req.body;
    getConnection((err, connection) => {
        if (err) throw err;
        connection.query('INSERT INTO thoughts (content) VALUES (?)', [content], (err) => {
            connection.release();
            if (err) throw err;
            res.redirect('/');
        });
    });
});

// Route to delete a thought
app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    getConnection((err, connection) => {
        if (err) throw err;
        connection.query('DELETE FROM thoughts WHERE id = ?', [id], (err) => {
            connection.release();
            if (err) throw err;
            res.redirect('/');
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
