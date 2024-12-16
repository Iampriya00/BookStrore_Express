const router = require("express").Router();
const User = require("../model/user");
const Books = require("../model/book");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");

// Middleware to check for required fields in book data
const validateBookData = (data) => {
  const requiredFields = [
    "url",
    "title",
    "author",
    "price",
    "des",
    "language",
    "category",
  ];
  for (const field of requiredFields) {
    if (!data[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
};

// Add new book
router.post("/addnewbook", authenticateToken, async (req, res) => {
  try {
    const { url, title, author, price, des, language, category } = req.body;
    const { id } = req.user;

    // Check if user is admin
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to add a new book" });
    }

    // Validate book data
    const validationError = validateBookData(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newBook = new Books({
      url,
      title,
      author,
      price,
      des,
      language,
      category,
    });
    await newBook.save();

    return res.status(201).json({ message: "New book added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update book
router.post("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { url, price, des, language, bookId, title, author, category } =
      req.body;
    const { id } = req.user;

    // Check if user is admin
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update a book" });
    }

    // Validate book data
    const validationError = validateBookData(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const book = await Books.findByIdAndUpdate(
      bookId,
      { url, price, des, language, title, author, category },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete book
router.delete("/deletebook/:bookId", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete a book" });
    }

    const { bookId } = req.params;
    const book = await Books.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all books
router.get("/allbooks", async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: "Success", data: books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get recent books (limit to 4)
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ status: "Success", data: books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// View book details
router.get("/view-book-details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
