import express, { Application } from 'express'
import { UserRepository } from '../Repositories/userRepository';
import { UserService } from '../Services/userService';
import { UserController } from '../Controllers/userControler';
import { authenticate } from '../Middlewares/authenticate';


const userRoute = express.Router()
const userRepository = new UserRepository()
const userServices = new UserService(userRepository)
const controler = new UserController(userServices)

userRoute.put('/profile',authenticate,(req,res,next)=>controler.updateProfile(req,res,next))
userRoute.get('/profile',authenticate,(req,res,next)=>controler.getProfile(req,res,next))
userRoute.delete('/profile',authenticate,(req,res,next)=>controler.deleteProfile(req,res,next))
userRoute.post('/event',authenticate,(req,res,next)=>controler.createEvent(req,res,next))
userRoute.get('/events',authenticate,(req,res,next)=>controler.getAllEvents(req,res,next))
userRoute.patch('/event',authenticate,(req,res,next)=>controler.rsvpEvent(req,res,next))
userRoute.delete('/event/:eventId',authenticate,(req,res,next)=>controler.deleteEvent(req,res,next))
userRoute.put('/event',authenticate,(req,res,next)=>controler.updateEvent(req,res,next))
export default userRoute; 
   