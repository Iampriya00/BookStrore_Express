const router = require("express").Router();
const User = require("../model/user");
const authenticateToken = require("./userAuth");

// Add to Favourites
router.put("/addtofavourite", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;

    const { bookid } = req.body;

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookFav = userData.favourites.includes(bookid);

    if (isBookFav) {
      return res.status(200).json({ message: "Book already in favourites" });
    } else {
      // Add book to favourites
      userData.favourites.push(bookid);
    }

    await userData.save();
    res.status(200).json({
      message: "Favourites updated successfully",
      favourites: userData.favourites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete from Favourites
router.post("/deletefromFav", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; // Get the user ID from the JWT token
    const { bookid } = req.body; // Get the book ID from the request body

    // Ensure bookid is provided
    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Find the user by ID
    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is in the user's favourites array
    const isBookFav = userData.favourites.some(
      (favBook) => favBook.toString() === bookid.toString()
    );

    if (!isBookFav) {
      return res.status(404).json({ message: "Book not found in favourites" });
    }

    // Remove the book from the favourites array
    userData.favourites = userData.favourites.filter(
      (book) => book.toString() !== bookid.toString()
    );

    // Save the updated user data
    const updatedUser = await userData.save();

    // Respond with a success message
    res.status(200).json({
      message: "Book removed from favourites successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Gell All Fav Books

router.get("/getallfavbooks", authenticateToken, async (req, res) => {
  try {
    // Assuming req.user is an object containing { id: userId }
    const userId = req.user.id; // Access the 'id' field from the user object

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const userData = await User.findById(userId).populate("favourites");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const favBooks = userData.favourites;
    res.status(200).json({ status: "Success", data: favBooks });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Clear all favourites
router.post("/clearAllFavourites", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; // Get the user ID from the JWT token

    // Find the user by ID
    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear the favourites array
    userData.favourites = [];

    // Save the updated user data
    const updatedUser = await userData.save();

    // Respond with a success message
    res.status(200).json({
      message: "All favourite books have been removed",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
