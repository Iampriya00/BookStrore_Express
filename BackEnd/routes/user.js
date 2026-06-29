const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");

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
    return res.status(201).json({ message: "Sign-up successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    const allUsers = await User.find();
    console.log("All Users:", allUsers);
    const existUser = await User.findOne({ email });
    console.log("User Found:", existUser);

    if (!existUser) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const authClaims = {
      id: existUser._id,
      userName: existUser.username,
    };

    const token = jwt.sign(authClaims, "bookStrore7894561230", {
      expiresIn: "10d",
    });

    res.status(200).json({ user: existUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/userInformation", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/updateDetails", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const { avatar, username, address, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar, username, address, phone },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash("Admin12345", 10);

    const admin = new User({
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      address: "India",
      phone: "9876543210",
    });

    await admin.save();

    return res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;
