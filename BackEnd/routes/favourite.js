const router = require("express").Router();
const User = require("../model/user");
const authenticateToken = require("./userAuth");

// Add to Favourites
router.put("/addtofavourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

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
router.delete("/deletefromFav", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookFav = userData.favourites.includes(bookid);

    if (isBookFav) {
      // Remove book from favourites
      userData.favourites = userData.favourites.filter(
        (book) => book !== bookid
      );

      await userData.save();
      return res.status(200).json({
        message: "Book removed from favourites",
        favourites: userData.favourites,
      });
    } else {
      return res.status(404).json({ message: "Book not found in favourites" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Gell All Fav Books

router.get("/getallfavbooks", authenticateToken, async (req, res) => {
  try {
    const id = req.headers.id;
    const userData = await User.findById(id).populate("favourites");
    const favBooks = userData.favourites;
    res.status(200).json({ status: "Success", data: favBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
