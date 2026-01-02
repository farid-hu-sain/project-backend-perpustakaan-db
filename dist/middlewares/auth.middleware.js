import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import config from "../utils/env.js";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        errorResponse(res, "token tidak ditemukan", 401);
    const token = authHeader?.split(" ")[1];
    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        errorResponse(res, "token tidak valid", 401);
    }
};
export const memberOnly = (req, res, next) => {
    if (req.user?.role !== "MEMBER") {
        return res.status(403).json({ error: "Member only" });
    }
    next();
};
export const AdminOnly = (req, res, next) => {
    if (req.user?.role === "ADMIN") {
        return next();
    }
    return res.status(403).json({ error: "Access denied" });
};
//# sourceMappingURL=auth.middleware.js.map
