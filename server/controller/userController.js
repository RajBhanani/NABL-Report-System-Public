import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";

// POST /
// Public
export const userLogin = expressAsyncHandler(async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      response.status(404);
      throw new Error("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      response.status(401);
      throw new Error("Wrong password");
    }
    generateToken(response, user._id, user.role);
    return response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    // .json(user)
  } catch (error) {
    response.status(400);
    throw new Error(error);
  }
});

// POST /logout
// Public
export const userLogout = expressAsyncHandler(async (request, response) => {
  response.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });
  response.status(200).json({ message: "User logged out" });
});

// GET /profile
// Authorised only
export const getUserProfile = expressAsyncHandler(async (request, response) => {
  response.status(200).json(request.user);
});

// PUT /profile
// Authorised only
export const upadateUserProfile = expressAsyncHandler(
  async (request, response) => {
    const user = await User.findOne({ _id: request.user._id });
    if (user) {
      user.name = request.body.name || user.name;
      user.email = request.body.email || user.email;
      if (request.body.password) {
        user.password = request.body.password;
      }
      const { _id, name, email } = await user.save();
      response.status(200).json({ _id, name, email });
    } else {
      response.status(404);
      throw new Error("User not found");
    }
  }
);

export const verifyUserLogin = expressAsyncHandler(
  async (request, response) => {
    response.status(200).json({message: "valid token"});
  }
);
