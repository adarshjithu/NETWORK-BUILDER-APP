import { NextFunction, Request, Response } from "express-serve-static-core";
import { AuthService } from "../Services/authService";
import { IUser, User } from "../Models/userModel";
import { BadRequstError, UnAuthorizedError } from "../Constants/error";
import { generateAccessToken, verifyRefreshToken } from "../Utils/token";
import { STATUS_CODES } from "../Constants/statusCodes";
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = STATUS_CODES;
export class AuthController {
    constructor(private authService: AuthService) {}

    // @desc   User Registration
    // @route  Post auth/register
    // @access User
    async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.body) new BadRequstError("Please provide the required information for registration.")
            const response = await this.authService.registerUser(req.body as IUser);

            const accessTokenMaxAge = 1000 * 60 * 5;
            const refreshTokenMaxAge = 1000 * 60 * 60 * 48;
            res.cookie("network-access_token", response.accessToken, {
                maxAge: accessTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            });
            res.cookie("network-refresh_token", response.refreshToken, {
                maxAge: refreshTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            });
            res.status(OK).json({ success: true, message: "User Registration successfull", user: response?.user });
        } catch (error) {
            next(error);
        }
    }

    // @desc   User Login
    // @route  Post auth/login
    // @access User
    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.body) new BadRequstError("Please provide the required information for login.")
            const response = await this.authService.loginUser(req.body as IUser);

            const accessTokenMaxAge = 1000 * 60 * 5;
            const refreshTokenMaxAge = 1000 * 60 * 60 * 48;
            res.cookie("network-access_token", response.accessToken, {
                maxAge: accessTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            });
            res.cookie("network-refresh_token", response.refreshToken, {
                maxAge: refreshTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            });
            res.status(OK).json({ success: true, message: "User Registration successfull", user: response?.user });
        } catch (error) {
            next(error);
        }
    }
    // @desc   Refresh access token
    // @route  Post auth/refresh_token
    // @access User
    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            

            const refreshToken = req.cookies["network-refresh_token"];
            const refreshTokenValid = verifyRefreshToken(refreshToken);
            if (!refreshToken || !refreshTokenValid) throw new UnAuthorizedError("Refresh Token Expired");

            const userId = refreshTokenValid.data;
            const user = await User.findOne({ _id: userId });
            if (!user) {
                throw new UnAuthorizedError("Refresh Token Expired");
            }

            const newAccessToken = generateAccessToken(user?._id as string);
            const accessTokenMaxAge = 1000 * 60 * 5;
            res.cookie("network-access_token", newAccessToken, {
                maxAge: accessTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
            })
                .status(OK)
                .json({ success: true, accessToken: newAccessToken });
        } catch (error) {
            next(error);
        }
    }
    // @desc   User logout
    // @route  Post auth/logout
    // @access User
    async logoutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.cookie("network-access_token", "", {
                maxAge: 0, 
                httpOnly: true,
                secure: true, 
                sameSite: "none", 
            });

            
            res.cookie("network-refresh_token", "", {
                maxAge: 0, 
                httpOnly: true,
                secure: true, 
                sameSite: "none", 
            });

            // Responding with a success message
            res.status(200).json({ success: true, message: "User logout successful" });
        } catch (error) {
            next(error);
        }
    }
    // @desc   User forget password
    // @route  Post auth/forget_password
    // @access User
    async forgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.body||req.body.email=='') throw new BadRequstError("Invalid email")
                const response =  await this.authService.forgetPassword(req?.body?.email)
                 if(response?.success){res?.status(OK).json({success:true,message:"Reset password link has been send to your email"})}
        } catch (error) {
            next(error);
        }
    }
    // @desc   Verify the forget password link
    // @route  Post auth/forget_password/verify_token
    // @access User
    async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.authService.verifyForgetPasswordToken(req.body.token)
           res?.status(OK).json({success:true,response:response})
        } catch (error) {
            next(error);
        }
    }
    // @desc   Rest the password after validation
    // @route  Post auth/forget_password/new_password
    // @access User
    async setNewPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.authService.updatePassword(req.body)
           res.status(OK).json({success:true,response:response})
        } catch (error) {
            next(error);
        }
    }
}
