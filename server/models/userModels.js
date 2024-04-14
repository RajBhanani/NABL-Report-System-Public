import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin", "superadmin"] },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(13);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

export default User;
