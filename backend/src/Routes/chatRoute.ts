import express, { Application } from 'express'
import { ChatRepository } from '../Repositories/chatRepository'
import { ChatService } from '../Services/chatService'
import { ChatController } from '../Controllers/chatController'
import { authenticate } from '../Middlewares/authenticate'


const chatRoute = express.Router()


const chatRepository = new ChatRepository()
const chatService = new ChatService(chatRepository)
const controler = new ChatController(chatService)

chatRoute.post("/group",authenticate,(req,res,next)=>controler.createGroup(req,res,next))
chatRoute.get("/groups",authenticate,(req,res,next)=>controler.getAllGroups(req,res,next))
chatRoute.get("/groups/search",authenticate,(req,res,next)=>controler.searchGroups(req,res,next))
chatRoute.post("/group/join",authenticate,(req,res,next)=>controler.joinGroup(req,res,next))
chatRoute.get('/group/messages/:groupId',authenticate,(req,res,next)=>controler.getAllMessages(req,res,next))
export default chatRoute