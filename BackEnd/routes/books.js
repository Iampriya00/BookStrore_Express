const router = require("express").Router();
const Books = require("../model/book");
const authenticateToken = require("./userAuth");

// =======================
// ADD NEW BOOK
// =======================
router.post("/addnewbook", authenticateToken, async (req, res) => {
  try {
    const { url, title, author, price, des, language, category } = req.body;

    // ✅ ADMIN CHECK (FROM JWT - NO DB CALL)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ VALIDATION
    if (!url || !title || !author || !price || !des || !language || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Books({
      url,
      title,
      author,
      price: Number(price),
      des,
      language,
      category: Array.isArray(category) ? category : [category],
    });

    await newBook.save();

    return res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// UPDATE BOOK
// =======================
router.put("/updatebook/:bookId", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.params;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedBook = await Books.findByIdAndUpdate(
      bookId,
      {
        ...req.body,
        price: req.body.price ? Number(req.body.price) : undefined,
        category: req.body.category
          ? Array.isArray(req.body.category)
            ? req.body.category
            : [req.body.category]
          : undefined,
      },
      { new: true },
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// DELETE BOOK
// =======================
router.delete("/deletebook/:bookId", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.params;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const deletedBook = await Books.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// GET ALL BOOKS
// =======================
router.get("/allbooks", async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// GET RECENT BOOKS
// =======================
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 }).limit(4);

    return res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// VIEW SINGLE BOOK
// =======================
router.get("/view-book-details/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book found",
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
