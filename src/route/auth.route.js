import express from "express";
import { loginRules, registerRules, validate } from "../middleware/validator.middleware.js";
import { login, register } from "../controller/auth.controller.js";

const authRoute = express();

authRoute.post("/register", registerRules, validate, register);
authRoute.post("/login", loginRules, validate, login);

export default authRoute;