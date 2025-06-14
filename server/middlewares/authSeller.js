import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
  const token = req.cookies.sellerToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


export default authSeller;