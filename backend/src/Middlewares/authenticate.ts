import { NextFunction, Request, Response } from "express";
import { verifyRefreshToken, verifyToken } from "../Utils/token";
import { UnAuthorizedError } from "../Constants/error";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["network-access_token"];
    const refreshToken = req.cookies["network-refresh_token"];
    const refreshTokenValid = verifyRefreshToken(refreshToken);
    if (!refreshToken || !refreshTokenValid) {
        throw new UnAuthorizedError("Refresh Token Expired");
    }
    const accessTokenValid = verifyToken(accessToken);
    if (!accessToken || !accessTokenValid) {
        throw new UnAuthorizedError("Access Token Expired");
    }

    req.userId = refreshTokenValid?.data;

    next();
};
