import express from "express";
import { loginRules, registerRules, validate } from "../middleware/validator.middleware.js";
import { login, register, getProfile } from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const authRoute = express();

authRoute.post("/register", registerRules, validate, register);
authRoute.post("/login", loginRules, validate, login);
authRoute.get("/profile", protect, getProfile);

export default authRoute;