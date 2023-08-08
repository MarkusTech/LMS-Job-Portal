import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign({ id }, secretKey, { expiresIn: "1d" });
};

export default generateToken;
