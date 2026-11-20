import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/password.js";
const creatorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    niches: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    startingFollowerCount: {
      type: Number,
      min: 0,
      default: 1000,
      select: false,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

creatorSchema.pre("save", async function hashCreatorPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await hashPassword(this.password);
});

creatorSchema.methods.comparePassword = async function comparePassword(candidate) {
  return verifyPassword(candidate, this.password);
};

const Creator =
  mongoose.models.Creator || mongoose.model("Creator", creatorSchema);

export default Creator;
