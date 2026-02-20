import express from "express";
import authRoute from "./auth.route.js";
import courseRoute from "./course.route.js";

const apiRoutes = express();

apiRoutes.use("/auth", authRoute);
apiRoutes.use("/course", courseRoute);

export default apiRoutes;