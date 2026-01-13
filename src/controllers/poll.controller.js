import { prisma } from "../models/prisma.js"; // singleton Prisma client
import asyncHandler from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";

// POST /polls → create a poll
const createPoll = asyncHandler(async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || !Array.isArray(options) || options.length < 2) {
    throw new ApiError(400, "Question and at least 2 options are required");
  }

  const poll = await prisma.poll.create({
    data: {
      question,
      options: {
        create: options.map((text) => ({ text }))
      }
    },
    include: { options: true } // include options in response
  });

  return res.status(201).json(new ApiResponse(201, { poll }, "Poll created successfully"));
});

// POST /polls/:id/vote → cast a vote
const votePoll = asyncHandler(async (req, res) => {
  const { pollId } = req.params;
  const { optionId, userId } = req.body;

  if (!optionId || !userId) {
    throw new ApiError(400, "optionId and userId are required");
  }

  // Check if poll exists
  const poll = await prisma.poll.findUnique({
    where: { id: parseInt(pollId) },
    include: { options: true }
  });

  if (!poll) throw new ApiError(404, "Poll not found");

  // Check if user already voted
  const existingVote = await prisma.vote.findUnique({
    where: { pollId_userId: { pollId: parseInt(pollId), userId } }
  });

  if (existingVote) throw new ApiError(409, "User has already voted");

  // Create vote
  const vote = await prisma.vote.create({
    data: {
      pollId: parseInt(pollId),
      optionId: parseInt(optionId),
      userId
    }
  });

  return res.status(201).json(new ApiResponse(201, { vote }, "Vote recorded"));
});

// GET /polls/:id → get poll details
const getPoll = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const poll = await prisma.poll.findUnique({
    where: { id: parseInt(id) },
    include: {
      options: {
        include: { votes: true }
      }
    }
  });

  if (!poll) throw new ApiError(404, "Poll not found");

  // Map options with vote counts
  const optionsWithVotes = poll.options.map((opt) => ({
    id: opt.id,
    text: opt.text,
    votes: opt.votes.length
  }));

  return res.status(200).json(
    new ApiResponse(200, { id: poll.id, question: poll.question, options: optionsWithVotes }, "Poll fetched successfully")
  );
});

export {
    createPoll,
    votePoll,
    getPoll
}