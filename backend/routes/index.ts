import express from "express";
import { productRouter } from './productRouter';
import { userRouter } from './userRouter';
import { dbRouter } from "./dbRouter";

const router = express.Router();

router.use("/user/", userRouter);
router.use("/product/", productRouter);
router.use("/", dbRouter);

export default router;
