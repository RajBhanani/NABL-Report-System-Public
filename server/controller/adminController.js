import expressAsyncHandler from "express-async-handler";
import User from "../models/userModels.js";

// POST /register
// Admin only
export const userRegister = expressAsyncHandler(async (request, response) => {
  try {
    const { name, email, password, role } = request.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      response.status(401);
      throw new Error("User already exists");
    }
    const newUser = await User.create({ name, email, password, role });
    if (newUser) {
      response.status(201).json({ message: "User created" });
    } else {
      response.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    response.status(400);
    throw new Error(error);
  }
});

export const verifyAdminLogin = expressAsyncHandler(
  async (request, response) => {
    response
      .status(200)
      .json({ message: "Has a valid token and is an admin." });
  }
);
