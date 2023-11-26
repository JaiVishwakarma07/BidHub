import createError from "../utils/createError.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return next(createError(401, "Not authenticated"))

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Token not valid"))
        req.userId = payload.id;
        next()
    })
}