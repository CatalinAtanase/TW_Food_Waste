import { userRouter } from './userRouter';
import express from "express";
import { dbRouter } from "./dbRouter";

const router = express.Router();

router.use("/user/", userRouter);
router.use("/", dbRouter);

export default router;
