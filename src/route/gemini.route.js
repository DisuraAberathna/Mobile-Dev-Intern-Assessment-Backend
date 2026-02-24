import express from "express";
import { authorize, protect } from "../middleware/auth.middleware.js";
import { getRecommendations } from "../controller/gemini.controller.js";

const geminiRoute = express();

geminiRoute.post("/recommend", protect, authorize("student"), getRecommendations);

export default geminiRoute;