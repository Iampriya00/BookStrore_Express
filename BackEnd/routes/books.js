const router = require("express").Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");

router.post("/addnewbook", authenticateToken, async (req, res) => {
  try {
    const { url, title, author, price, des, language } = req.body;
    const { id } = req.header;
    const user = await User.findById(id);
    if (user.role !== admin) {
      return res
        .status(401)
        .send({ message: "You are not authorized to add a new book" });
    }
    const newBook = new Book({
      url,
      title,
      author,
      price,
      des,
      language,
    });
    await newBook.save();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { price, des, language } = req.body;
    const { id } = req.headers;
    const user = await User.findById(id);

    // Check if the user exists and has the 'admin' role
    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .send({ message: "You are not authorized to update a book" });
    }

    // Find and update the book
    const { bookId } = req.body; // Assuming book ID is passed in the request body
    const book = await Book.findByIdAndUpdate(
      bookId,
      { price, des, language },
      { new: true } // Option to return the updated document
    );

    // Check if the book was found and updated
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.delete("/deletebook/:bookId", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; // User ID from headers
    const user = await User.findById(id);

    // Check if the user exists and has the 'admin' role
    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete a book" });
    }

    const { bookId } = req.params; // Book ID from route parameters

    // Find and delete the book
    const book = await Book.findByIdAndDelete(bookId);

    // Check if the book was found and deleted
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/allbooks", async (req, res) => {
  try {
    await Book.find().sort({ createdAt: -1 });
    res.send(200).json();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
