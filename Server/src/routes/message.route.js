import { Router } from "express";
import { getMessage } from "../controllers/message.controller.js";
import verfiyUser from "../middlewares/auth.middleware.js";

const messageRouter = Router()

messageRouter.route("/get-messages/:id").get(verfiyUser,getMessage)

export default messageRouter