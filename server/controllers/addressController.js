import Address from "../models/Address.js"; // Make sure model name matches file name
import connectDB from "../configs/db.js"; // Your DB connection utility

// Add Address : /api/address/add
export const addAddress = async (req, res) => {
  await connectDB(); // Ensure DB is connected before using models

  try {
    console.log("Incoming request body:", req.body);

    const {
      userId: rawUserId, // received from frontend or set by auth middleware
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = req.body;

    // ✅ Prefer using req.user._id if you have an auth middleware
    const userId = req.user?.id || rawUserId;

    // 🔐 Secure fallback to prevent model validation error
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing `userId`. Make sure you're sending it from the frontend or using an auth middleware.",
      });
    }

    const newAddress = await Address.create({
      userId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    });

    res.json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });

  } catch (error) {
    console.error("Error creating address:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

  

// Get address : /api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.query; // ✅ use req.query for GET requests

    const addresses = await Address.find({ userId });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

