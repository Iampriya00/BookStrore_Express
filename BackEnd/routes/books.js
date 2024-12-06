const router = require("express").Router();
const User = require("../model/user");
const Books = require("../model/book");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");

router.post("/addnewbook", authenticateToken, async (req, res) => {
  try {
    const { url, title, author, price, des, language } = req.body;
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to add a new book" });
    }

    const newBook = new Books({
      url,
      title,
      author,
      price,
      des,
      language,
    });
    await newBook.save();
    return res.status(201).json({ message: "New book added successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { price, des, language, bookId } = req.body;
    const { id } = req.headers;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to update a book" });
    }

    const book = await Books.findByIdAndUpdate(
      bookId,
      { price, des, language },
      { new: true }
    );

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
    const { id } = req.headers;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete a book" });
    }

    const { bookId } = req.params;
    const book = await Books.findByIdAndDelete(bookId);

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
    const books = await Books.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: "Success", data: books });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ status: "Success", data: books });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/view-book-details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Books.findById(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({ message: "Book found", book });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
