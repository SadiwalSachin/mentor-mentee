import { Router } from "express";
import { signUpUser, verifyVerificationCode } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.route("/sign-up").post(signUpUser)
userRouter.route("/verify-code").post(verifyVerificationCode)

export default  userRouter