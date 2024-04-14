import jwt from "jsonwebtoken";

const sessionHours = 8;

const generateToken = async (res, userId, userRole) => {
  const token = jwt.sign({ userId, userRole }, process.env.JWT_SECRET, {
    expiresIn: sessionHours * 60 * 60 * 1000,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: sessionHours * 60 * 60 * 1000,
  });
};

export default generateToken;
