import { rateLimit } from "express-rate-limit";

export const recommendationLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    limit: 1,
    message: {
        message: "Too many recommendation requests from this IP, please try again after 24 hours"
    },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
