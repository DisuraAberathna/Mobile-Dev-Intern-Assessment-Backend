import express from "express";
import { registerRules, validate } from "../middleware/validator.middleware.js";
import { login, register } from "../controller/auth.controller.js";

const authRoute = express();

authRoute.post("/register", registerRules, validate, register);
authRoute.post("/login", login);

export default authRoute;