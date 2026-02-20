import express from "express";
import { authorize, protect } from "../middleware/auth.middleware.js";
import { getRecommendations } from "../controller/gpt.controller.js";

const gptRoute = express();

gptRoute.post("/recommend", protect, authorize("student"), getRecommendations);

export default gptRoute;