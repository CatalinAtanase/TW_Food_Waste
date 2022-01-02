import { userController } from '../controllers/userController';
import express from "express";

export const userRouter = express.Router();

userRouter.get('', userController.getAll)
userRouter.post('', userController.addUser)
userRouter.get('/:id/', userController.getById)
userRouter.patch('/:id/', userController.updateUser)
userRouter.delete('/:id/', userController.deleteUser)
userRouter.get('/app/:username/', userController.getByUsername)
