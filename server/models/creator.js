import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import mongoose from "mongoose";

const scrypt = promisify(scryptCallback);
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

creatorSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) {
    return;
  }

  const salt = randomBytes(16).toString("hex");
  const passwordHash = await scrypt(this.password, salt, 64);
  this.password = `scrypt$${salt}$${passwordHash.toString("hex")}`;
});

creatorSchema.methods.comparePassword = async function comparePassword(candidate) {
  if (typeof candidate !== "string" || typeof this.password !== "string") {
    return false;
  }

  const [algorithm, salt, storedHash] = this.password.split("$");
  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const passwordHash = await scrypt(candidate, salt, 64);
  const expectedHash = Buffer.from(storedHash, "hex");
  return (
    passwordHash.length === expectedHash.length &&
    timingSafeEqual(passwordHash, expectedHash)
  );
};

const Creator =
  mongoose.models.Creator || mongoose.model("Creator", creatorSchema);

export default Creator;
