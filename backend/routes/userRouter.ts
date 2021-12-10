import { userController } from './../controllers/user';
import express from "express";

export const userRouter = express.Router();

userRouter.get('/reset', userController.getAll)
