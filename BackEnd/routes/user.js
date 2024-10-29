const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must be at least 5 characters long" });
    }

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "User email already exists" });
    }

    if (password.length <= 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      address,
      phone,
    });

    await newUser.save();
    return res.status(200).json({ message: "SignUp Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "Invalid User" });
    }

    // Compare the password using await
    const isPasswordValid = await bcrypt.compare(password, existUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Create JWT payload
    const authClaims = {
      name: existUser.username,
      role: existUser.role,
    };

    // Generate the JWT token
    const token = jwt.sign(authClaims, "bookStrore7894561230", {
      expiresIn: "10d",
    });

    // Respond with user ID, role, and token
    res
      .status(200)
      .json({ id: existUser._id, role: existUser.role, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
});

module.exports = router;
