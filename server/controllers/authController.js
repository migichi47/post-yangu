import Creator from "../models/creator.js";
import Fan from "../models/fan.js";

function publicCreator(creator) {
  return {
    _id: creator._id.toString(),
    username: creator.username,
    displayName: creator.displayName,
    profileImage: creator.profileImage,
    coverImage: creator.coverImage,
    niches: creator.niches,
    location: creator.location,
    email: creator.email,
    phoneNumber: creator.phoneNumber,
    isVerified: creator.isVerified,
    createdAt: creator.createdAt,
    updatedAt: creator.updatedAt,
  };
}

function publicFan(fan) {
  return {
    _id: fan._id.toString(),
    fullName: fan.fullName,
    email: fan.email,
  };
}

function clearSessionCookie(response) {
  response.clearCookie("postyangu.sid", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function destroySession(request) {
  return new Promise((resolve, reject) => {
    request.session.destroy((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

async function createSession(request, accountType, account) {
  await new Promise((resolve, reject) => {
    request.session.regenerate((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  request.session.accountType = accountType;
  request.session[`${accountType}Id`] = account.id;
  await new Promise((resolve, reject) => {
    request.session.save((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

export async function signup(request, response) {
  const {
    username,
    password,
    displayName,
    profileImage,
    coverImage,
    niches,
    location,
    email,
    phoneNumber,
  } = request.body ?? {};

  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    password.length < 8 ||
    typeof displayName !== "string" ||
    !displayName.trim() ||
    typeof profileImage !== "string" ||
    !profileImage.trim()
  ) {
    return response.status(400).json({
      error:
        "Username, password (at least 8 characters), display name, and profile image are required.",
    });
  }

  if (
    (email !== undefined && typeof email !== "string") ||
    (phoneNumber !== undefined && typeof phoneNumber !== "string") ||
    (coverImage !== undefined && typeof coverImage !== "string") ||
    (location !== undefined && typeof location !== "string") ||
    (niches !== undefined &&
      (!Array.isArray(niches) ||
        niches.some((niche) => typeof niche !== "string")))
  ) {
    return response.status(400).json({ error: "Invalid signup data." });
  }

  const creator = new Creator({
    username,
    password,
    displayName,
    profileImage,
    coverImage,
    niches,
    location,
    email,
    phoneNumber,
  });

  try {
    await creator.save();
  } catch (error) {
    if (error.code === 11000) {
      return response
        .status(409)
        .json({ error: "Username or email is already in use." });
    }

    if (error.name === "ValidationError") {
      return response.status(400).json({ error: "Invalid signup data." });
    }

    throw error;
  }

  await createSession(request, "creator", creator);
  return response
    .status(201)
    .json({ accountType: "creator", creator: publicCreator(creator) });
}

export async function login(request, response) {
  const { username, email, password } = request.body ?? {};
  const identifier =
    typeof username === "string" && username.trim()
      ? username.trim().toLowerCase()
      : typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

  if (!identifier || typeof password !== "string" || !password) {
    return response
      .status(400)
      .json({ error: "Provide a username or email and password." });
  }

  const creator = await Creator.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+password");

  if (!creator || !(await creator.comparePassword(password))) {
    return response
      .status(401)
      .json({ error: "Invalid username/email or password." });
  }

  await createSession(request, "creator", creator);
  return response.json({
    accountType: "creator",
    creator: publicCreator(creator),
  });
}

export async function signupFan(request, response) {
  const { fullName, email, password } = request.body ?? {};
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    fullName.trim().length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return response.status(400).json({
      error:
        "Full name, a valid email address, and a password of at least 8 characters are required.",
    });
  }

  const fan = new Fan({
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
  });

  try {
    await fan.save();
  } catch (error) {
    if (error.code === 11000) {
      return response
        .status(409)
        .json({ error: "An account with this email already exists." });
    }

    if (error.name === "ValidationError") {
      return response.status(400).json({ error: "Invalid signup data." });
    }

    throw error;
  }

  await createSession(request, "fan", fan);
  return response.status(201).json({
    accountType: "fan",
    fan: publicFan(fan),
  });
}

export async function loginFan(request, response) {
  const { email, password } = request.body ?? {};
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    typeof password !== "string" ||
    !password
  ) {
    return response
      .status(400)
      .json({ error: "Provide a valid email address and password." });
  }

  const fan = await Fan.findOne({ email: normalizedEmail }).select("+password");
  if (!fan || !(await fan.comparePassword(password))) {
    return response
      .status(401)
      .json({ error: "Invalid email or password." });
  }

  await createSession(request, "fan", fan);
  return response.json({
    accountType: "fan",
    fan: publicFan(fan),
  });
}

export async function me(request, response) {
  const accountType =
    request.session.accountType || (request.session.creatorId ? "creator" : "");
  const accountId =
    accountType === "creator"
      ? request.session.creatorId
      : accountType === "fan"
        ? request.session.fanId
        : null;
  const Account =
    accountType === "creator" ? Creator : accountType === "fan" ? Fan : null;

  if (!accountId || !Account) {
    return response.status(401).json({ error: "Not authenticated." });
  }

  const account = await Account.findById(accountId);
  if (!account) {
    await destroySession(request);
    clearSessionCookie(response);
    return response.status(401).json({ error: "Not authenticated." });
  }

  return response.json(
    accountType === "creator"
      ? { accountType, creator: publicCreator(account) }
      : { accountType, fan: publicFan(account) },
  );
}

export async function logout(request, response) {
  await destroySession(request);
  clearSessionCookie(response);
  return response.sendStatus(204);
}
