import User from "../models/userModel.js";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { user_name, user_email, password, role, phone_no, address } = req.body;

    const exists = await User.findOne({ user_email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const user_id = "U" + Date.now();

    const user = await User.create({
      user_id,
      user_name,
      user_email,
      password,
      role,
      phone_no,
      address
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        User_ID: user.user_id,
        User_Name: user.user_name,
        User_Email: user.user_email,
        Role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { user_email, password } = req.body;

    const user = await User.findOne({ user_email, password });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        User_ID: user.user_id,
        User_Name: user.user_name,
        Role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get user profile by ID
export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findOne({ user_id: req.params.user_id }).select(
        "-password -__v -_id"
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        User_ID: user.user_id,
        User_Name: user.user_name,
        User_Email: user.user_email,
        Role: user.role,
        Phone_No: user.phone_no,
        Address: user.address,
      });
    } catch (err) {
      console.error("❌ Error fetching user profile:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
  // ✅ Update user profile by ID
export const updateUserProfile = async (req, res) => {
    try {
      const updates = req.body;
      const user = await User.findOneAndUpdate(
        { user_id: req.params.user_id },
        updates,
        { new: true }
      ).select("-password -__v -_id");
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        message: "User updated successfully",
        user: {
          User_ID: user.user_id,
          User_Name: user.user_name,
          User_Email: user.user_email,
          Role: user.role,
          Phone_No: user.phone_no,
          Address: user.address,
        },
      });
    } catch (err) {
      console.error("❌ Error updating user:", err);
      res.status(500).json({ error: err.message });
    }
  };
  