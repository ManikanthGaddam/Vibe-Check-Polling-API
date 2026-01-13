import express from "express";
import { createPoll, votePoll, getPoll } from "../controllers/poll.controller.js";

const router = express.Router();

router.route("/polls").post(createPoll);
router.route("/polls/:pollId/vote").post(votePoll);
router.route("/polls/:id").get(getPoll);

export default router;
