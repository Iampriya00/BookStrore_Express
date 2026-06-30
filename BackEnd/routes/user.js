const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");

// =======================
// SIGNUP
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (!username || username.length < 5) {
      return res.status(400).json({
        message: "Username must be at least 5 characters",
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      address,
      phone,
      role: "user", // ✅ IMPORTANT FIX
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ FIX: INCLUDE ROLE IN TOKEN
    const token = jwt.sign(
      {
        id: existUser._id,
        role: existUser.role,
      },
      "bookStrore7894561230",
      { expiresIn: "10d" },
    );

    return res.status(200).json({
      user: {
        id: existUser._id,
        username: existUser.username,
        email: existUser.email,
        role: existUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// USER INFO
// =======================
router.get("/userInformation", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// UPDATE USER
// =======================
router.post("/updateDetails", authenticateToken, async (req, res) => {
  try {
    const { avatar, username, address, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar, username, address, phone },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// CREATE ADMIN
// =======================
router.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("Admin12345", 10);

    const admin = new User({
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      address: "India",
      phone: "9876543210",
      role: "admin", // ✅ IMPORTANT FIX
    });

    await admin.save();

    return res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
