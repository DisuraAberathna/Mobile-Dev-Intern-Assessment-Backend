import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connect from "./src/config/database.config.js";
import apiRoutes from "./src/route/api.route.js";

dotenv.config();

const port = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(helmet({
    contentSecurityPolicy: false
}));

server.get("/", (req, resp) => {
    resp.send("Server Running, Hello World!");
});

server.use("/api", apiRoutes);

server.use((err, req, resp, next) => {
    const status = err.status || 500;

    resp.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

connect();

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});