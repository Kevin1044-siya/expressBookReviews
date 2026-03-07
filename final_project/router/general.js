const express = require('express');
const axios = require('axios');
let router = express.Router();

let books = require("./booksdb.js");

// Task 1: Get all books
router.get('/', (req, res) => {
  res.send(JSON.stringify(books, null, 4));
});

// Task 2: Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.send(JSON.stringify(books[isbn], null, 4));
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Get books by author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = {};

  for (let isbn in books) {
    if (books[isbn].author === author) {
      result[isbn] = books[isbn];
    }
  }

  res.send(JSON.stringify(result, null, 4));
});

// Task 4: Get books by title
router.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = {};

  for (let isbn in books) {
    if (books[isbn].title === title) {
      result[isbn] = books[isbn];
    }
  }

  res.send(JSON.stringify(result, null, 4));
});

// Task 5: Get book review
router.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


// ----------------------
// Async Tasks with Axios
// ----------------------

// Task 10: Get all books using async/await
router.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Task 11: Search by ISBN using Axios
router.get('/async/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Task 12: Search by Author using Axios
router.get('/async/author/:author', async (req, res) => {
  const author = req.params.author;

  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Task 13: Search by Title using Axios
router.get('/async/title/:title', async (req, res) => {
  const title = req.params.title;

  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports.general = router;
