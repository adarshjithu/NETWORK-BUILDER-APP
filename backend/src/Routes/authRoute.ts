import express, { Application } from 'express'
import { AuthRepository } from '../Repositories/authRepository';
import { AuthService } from '../Services/authService';
import { AuthController } from '../Controllers/authController';

const authRouter = express.Router()
 
const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const controller = new AuthController(authService)

authRouter.post('/register',(req,res,next)=>controller.registerUser(req,res,next))
authRouter.post('/login',(req,res,next)=>controller.loginUser(req,res,next))
authRouter.get('/refresh_token',(req,res,next)=>controller.refreshToken(req,res,next))
authRouter.get('/logout',(req,res,next)=>controller.logoutUser(req,res,next))


export default authRouter;
 
