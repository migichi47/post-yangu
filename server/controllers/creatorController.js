import Creator from "../models/creator.js";
import Follow from "../models/follow.js";

const publicFields = {
  username: 1,
  displayName: 1,
  profileImage: 1,
  coverImage: 1,
  niches: 1,
  location: 1,
  isVerified: 1,
  createdAt: 1,
  followerCount: 1,
  startingFollowerCount: 1,
};

const defaultStartingFollowerCount = 1000;

// Existing demo audience counts; PostYangu follows are added separately.
const startingFollowerCounts = {
  crazy_kennar: 2_100_000,
  mammito: 1_200_000,
  elsa_mjimbo: 2_800_000,
  kabiwajesus: 1_300_000,
  thee_pluto: 1_500_000,
  thekingkaka: 900_000,
  abelmutua: 850_000,
  muthonidrummerqueen: 180_000,
  waboshmaxine: 350_000,
  "wanjiku.wanders": 284_000,
  aminacooks: 167_000,
  kamaucreates: 412_000,
  stylebynjeri: 128_000,
  otienoframes: 96_000,
  zurilearns: 76_000,
};

function getFollowerCount(
  username,
  appFollowerCount = 0,
  configuredStartingCount,
) {
  const startingCount = Object.prototype.hasOwnProperty.call(
    startingFollowerCounts,
    username,
  )
    ? startingFollowerCounts[username]
    : configuredStartingCount ?? defaultStartingFollowerCount;
  return startingCount + appFollowerCount;
}

const startingFollowerCountExpression = {
  $switch: {
    branches: Object.entries(startingFollowerCounts).map(
      ([username, count]) => ({
        case: { $eq: ["$username", username] },
        then: count,
      }),
    ),
    default: {
      $ifNull: ["$startingFollowerCount", defaultStartingFollowerCount],
    },
  },
};

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function publicCreator(creator, isFollowing, canFollow) {
  return {
    _id: creator._id.toString(),
    username: creator.username,
    displayName: creator.displayName,
    profileImage: creator.profileImage,
    coverImage: creator.coverImage,
    niches: creator.niches || [],
    location: creator.location || "",
    isVerified: creator.isVerified,
    createdAt: creator.createdAt,
    followerCount: getFollowerCount(
      creator.username,
      creator.followerCount ?? 0,
      creator.startingFollowerCount,
    ),
    isFollowing,
    canFollow,
  };
}

async function addFollowState(creators, fanId, canFollow) {
  if (!creators.length) return [];

  const creatorIds = creators.map((creator) => creator._id);
  const [followingIds, followerCounts] = await Promise.all([
    fanId
      ? Follow.distinct("creatorId", {
          fanId,
          creatorId: { $in: creatorIds },
        })
      : [],
    Follow.aggregate([
      { $match: { creatorId: { $in: creatorIds } } },
      { $group: { _id: "$creatorId", count: { $sum: 1 } } },
    ]),
  ]);
  const following = new Set(followingIds.map((id) => id.toString()));
  const counts = new Map(
    followerCounts.map(({ _id, count }) => [_id.toString(), count]),
  );

  return creators.map((creator) => {
    const id = creator._id.toString();
    return publicCreator(
      { ...creator, followerCount: counts.get(id) || 0 },
      following.has(id),
      canFollow,
    );
  });
}

function usernameFromRequest(request) {
  return typeof request.params.username === "string"
    ? request.params.username.replace(/^@/, "").trim().toLowerCase()
    : "";
}

export async function listCreators(request, response) {
  const page = Math.max(1, Number.parseInt(request.query.page, 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(request.query.limit, 10) || 12),
  );
  const filter = {};
  const search =
    typeof request.query.q === "string"
      ? request.query.q.trim().slice(0, 100)
      : "";
  const niche =
    typeof request.query.niche === "string"
      ? request.query.niche.trim().slice(0, 80)
      : "";
  const location =
    typeof request.query.location === "string"
      ? request.query.location.trim().slice(0, 100)
      : "";

  if (search) {
    const expression = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { username: expression },
      { displayName: expression },
      { niches: expression },
      { location: expression },
    ];
  }
  if (niche) filter.niches = new RegExp(escapeRegex(niche), "i");
  if (location) filter.location = new RegExp(escapeRegex(location), "i");
  if (request.query.verified === "true") filter.isVerified = true;
  if (request.query.verified === "false") filter.isVerified = false;

  const sort =
    request.query.sort === "popular"
      ? { followerCount: -1, createdAt: -1 }
      : { createdAt: -1, _id: 1 };
  const pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: Follow.collection.name,
        let: { creatorId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$creatorId", "$$creatorId"] } } },
          { $count: "count" },
        ],
        as: "followerCounts",
      },
    },
    {
      $addFields: {
        followerCount: {
          $add: [
            { $ifNull: [{ $arrayElemAt: ["$followerCounts.count", 0] }, 0] },
            startingFollowerCountExpression,
          ],
        },
      },
    },
    { $project: { followerCounts: 0, password: 0, email: 0, phoneNumber: 0 } },
    { $sort: sort },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    { $project: publicFields },
  ];
  const [creators, total] = await Promise.all([
    Creator.aggregate(pipeline),
    Creator.countDocuments(filter),
  ]);
  const canFollow = request.auth.accountType === "fan";

  return response.json({
    creators: await addFollowState(
      creators,
      canFollow ? request.auth.accountId : null,
      canFollow,
    ),
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function getCreator(request, response) {
  const creator = await Creator.findOne({
    username: usernameFromRequest(request),
  })
    .select(
      "username displayName profileImage coverImage niches location isVerified createdAt +startingFollowerCount",
    )
    .lean();

  if (!creator) {
    return response.status(404).json({ error: "Creator not found." });
  }

  const canFollow = request.auth.accountType === "fan";
  const [result] = await addFollowState(
    [creator],
    canFollow ? request.auth.accountId : null,
    canFollow,
  );
  return response.json({ creator: result });
}

export async function listFollowing(request, response) {
  const follows = await Follow.find({ fanId: request.auth.accountId })
    .sort({ createdAt: -1 })
    .select("creatorId")
    .lean();
  const creators = await Creator.find({
    _id: { $in: follows.map((follow) => follow.creatorId) },
  })
    .select(
      "username displayName profileImage coverImage niches location isVerified createdAt +startingFollowerCount",
    )
    .lean();
  const creatorById = new Map(
    creators.map((creator) => [creator._id.toString(), creator]),
  );
  const orderedCreators = follows
    .map((follow) => creatorById.get(follow.creatorId.toString()))
    .filter(Boolean);

  return response.json({
    creators: await addFollowState(
      orderedCreators,
      request.auth.accountId,
      true,
    ),
  });
}

export async function followCreator(request, response) {
  const creator = await Creator.findOne({
    username: usernameFromRequest(request),
  })
    .select("_id username +startingFollowerCount")
    .lean();
  if (!creator) {
    return response.status(404).json({ error: "Creator not found." });
  }

  try {
    await Follow.updateOne(
      { fanId: request.auth.accountId, creatorId: creator._id },
      {
        $setOnInsert: {
          fanId: request.auth.accountId,
          creatorId: creator._id,
        },
      },
      { upsert: true },
    );
  } catch (error) {
    if (error.code !== 11000) throw error;
  }

  const followerCount = await Follow.countDocuments({
    creatorId: creator._id,
  });
  return response.json({
    isFollowing: true,
    followerCount: getFollowerCount(
      creator.username,
      followerCount,
      creator.startingFollowerCount,
    ),
  });
}

export async function unfollowCreator(request, response) {
  const creator = await Creator.findOne({
    username: usernameFromRequest(request),
  })
    .select("_id username +startingFollowerCount")
    .lean();
  if (!creator) {
    return response.status(404).json({ error: "Creator not found." });
  }

  await Follow.deleteOne({
    fanId: request.auth.accountId,
    creatorId: creator._id,
  });
  const followerCount = await Follow.countDocuments({
    creatorId: creator._id,
  });
  return response.json({
    isFollowing: false,
    followerCount: getFollowerCount(
      creator.username,
      followerCount,
      creator.startingFollowerCount,
    ),
  });
}
