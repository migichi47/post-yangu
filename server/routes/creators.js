import { Router } from "express";
import {
  followCreator,
  getCreator,
  listCreators,
  listFollowing,
  unfollowCreator,
} from "../controllers/creatorController.js";
import { requireFan, requireSignedIn } from "../middleware/requireAccount.js";

const creatorRouter = Router();

creatorRouter.use(requireSignedIn);
creatorRouter.get("/following", requireFan, listFollowing);
creatorRouter.get("/", listCreators);
creatorRouter.get("/:username", getCreator);
creatorRouter.put("/:username/follow", requireFan, followCreator);
creatorRouter.delete("/:username/follow", requireFan, unfollowCreator);

export default creatorRouter;
