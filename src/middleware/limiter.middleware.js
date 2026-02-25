import { rateLimit } from "express-rate-limit";

export const recommendationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        message: "Too many recommendation requests. Please try again after 15 minutes."
    },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
