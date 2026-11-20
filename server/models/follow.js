import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    fanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fan",
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },
  },
  { timestamps: true },
);

followSchema.index({ fanId: 1, creatorId: 1 }, { unique: true });
followSchema.index({ creatorId: 1, createdAt: -1 });

const Follow = mongoose.models.Follow || mongoose.model("Follow", followSchema);

export default Follow;
