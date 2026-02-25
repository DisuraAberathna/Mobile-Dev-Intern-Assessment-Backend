import express from "express";
import { authorize, protect } from "../middleware/auth.middleware.js";
import { getRecommendations } from "../controller/gemini.controller.js";
import { recommendationLimiter } from "../middleware/limiter.middleware.js";

const geminiRoute = express();

geminiRoute.post("/recommend", protect, authorize("student"), recommendationLimiter, getRecommendations);

export default geminiRoute;