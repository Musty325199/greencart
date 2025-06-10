import Address from "../models/address.js"


// Add Address : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const {
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
    } = req.body;

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

    res.json({ success: true, message: "Address added successfully", data: newAddress });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
  

// Get address : /api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.query;

    const addresses = await Address.find({ userId });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

