import Creator from "../models/creator.js";

function publicCreator(creator) {
  return {
    _id: creator._id.toString(),
    username: creator.username,
    displayName: creator.displayName,
    profileImage: creator.profileImage,
    coverImage: creator.coverImage,
    niches: creator.niches,
    email: creator.email,
    phoneNumber: creator.phoneNumber,
    isVerified: creator.isVerified,
    createdAt: creator.createdAt,
    updatedAt: creator.updatedAt,
  };
}

async function createSession(request, creator) {
  await new Promise((resolve, reject) => {
    request.session.regenerate((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  request.session.creatorId = creator.id;
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

  await createSession(request, creator);
  return response.status(201).json({ creator: publicCreator(creator) });
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

  await createSession(request, creator);
  return response.json({ creator: publicCreator(creator) });
}

export async function me(request, response) {
  const creatorId = request.session.creatorId;
  if (!creatorId) {
    return response.status(401).json({ error: "Not authenticated." });
  }

  const creator = await Creator.findById(creatorId);
  if (!creator) {
    await new Promise((resolve, reject) => {
      request.session.destroy((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    response.clearCookie("postyangu.sid", { path: "/" });
    return response.status(401).json({ error: "Not authenticated." });
  }

  return response.json({ creator: publicCreator(creator) });
}
