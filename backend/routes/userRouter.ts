import { userController } from '../controllers/userController';
import express from "express";

export const userRouter = express.Router();

userRouter.get('', userController.getAll)
userRouter.post('', userController.addUser)
userRouter.get('/:id/', userController.getById)
userRouter.get('/app/:username/', userController.getByUsername)
