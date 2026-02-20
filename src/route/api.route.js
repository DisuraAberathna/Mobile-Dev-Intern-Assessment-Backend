import express from "express";
import authRoute from "./auth.route.js";

const apiRoutes = express();

apiRoutes.use("/auth", authRoute);

export default apiRoutes;