const express = require('express');
let router = express.Router();

let books = require("./booksdb.js");

const getBooks = async () => {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
};

// Task 1: Get all books
router.get('/', async (req, res) => {
  const bookList = await getBooks();
  res.send(JSON.stringify(bookList, null, 4));
});

// Task 2: Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    res.send(JSON.stringify(book, null, 4));
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

// Task 5: Get book reviews
router.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 10: Get all books using async callback
router.get('/async/books', async (req, res) => {
  const bookList = await getBooks();
  res.send(JSON.stringify(bookList, null, 4));
});

// Task 11: Search by ISBN using promise
router.get('/async/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  const book = await new Promise((resolve, reject) => {
    resolve(books[isbn]);
  });

  if (book) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 12: Search by author using async
router.get('/async/author/:author', async (req, res) => {
  const author = req.params.author;

  const result = await new Promise((resolve, reject) => {
    let booksByAuthor = {};
    for (let isbn in books) {
      if (books[isbn].author === author) {
        booksByAuthor[isbn] = books[isbn];
      }
    }
    resolve(booksByAuthor);
  });

  res.send(JSON.stringify(result, null, 4));
});

// Task 13: Search by title using async
router.get('/async/title/:title', async (req, res) => {
  const title = req.params.title;

  const result = await new Promise((resolve, reject) => {
    let booksByTitle = {};
    for (let isbn in books) {
      if (books[isbn].title === title) {
        booksByTitle[isbn] = books[isbn];
      }
    }
    resolve(booksByTitle);
  });

  res.send(JSON.stringify(result, null, 4));
});

module.exports.general = router;
module.exports.general = public_users;
