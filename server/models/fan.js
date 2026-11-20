import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/password.js";

const fanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

fanSchema.pre("save", async function hashFanPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await hashPassword(this.password);
});

fanSchema.methods.comparePassword = function comparePassword(candidate) {
  return verifyPassword(candidate, this.password);
};

const Fan = mongoose.models.Fan || mongoose.model("Fan", fanSchema);

export default Fan;
