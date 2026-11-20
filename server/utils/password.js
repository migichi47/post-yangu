import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const passwordHash = await scrypt(password, salt, 64);
  return `scrypt$${salt}$${passwordHash.toString("hex")}`;
}

export async function verifyPassword(candidate, storedPassword) {
  if (typeof candidate !== "string" || typeof storedPassword !== "string") {
    return false;
  }

  const [algorithm, salt, storedHash] = storedPassword.split("$");
  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const passwordHash = await scrypt(candidate, salt, 64);
  const expectedHash = Buffer.from(storedHash, "hex");
  return (
    passwordHash.length === expectedHash.length &&
    timingSafeEqual(passwordHash, expectedHash)
  );
}
