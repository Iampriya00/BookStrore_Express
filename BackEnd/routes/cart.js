const router = require("express").Router();
const User = require("../model/user");
const authenticateToken = require("./userAuth");

// Add to Cart
router.put("/addtocart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.body;

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookInCart = userData.cart.includes(bookid);

    if (isBookInCart) {
      return res.status(200).json({ message: "Book already in Cart" });
    } else {
      // Add book to cart
      userData.cart.push(bookid);
    }

    await userData.save();
    res.status(200).json({
      message: "Cart updated successfully",
      cart: userData.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove from Cart
router.put("/deletefromCart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { id } = req.body;
    const { bookid } = req.params;

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookInCart = userData.cart.includes(bookid);

    if (isBookInCart) {
      // Remove book from cart
      userData.cart = userData.cart.filter((book) => book !== bookid);

      await userData.save();
      return res.status(200).json({
        message: "Book removed from cart",
        cart: userData.cart,
      });
    } else {
      return res.status(404).json({ message: "Book not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Favourite Books
router.get("/getallfavbooks", authenticateToken, async (req, res) => {
  try {
    const id = req.headers.id;
    const userData = await User.findById(id).populate("favourites");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const favBooks = userData.favourites;
    res.status(200).json({ status: "Success", data: favBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
