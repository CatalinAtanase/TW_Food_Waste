import express from "express";
import { productRouter } from './productRouter';
import { userRouter } from './userRouter';
import { dbRouter } from "./dbRouter";
import { groupRouter } from "./groupRouter";

const router = express.Router();

router.use("/user/", userRouter);
router.use("/product/", productRouter);
router.use("/group/", groupRouter);
router.use("/", dbRouter);

export default router;
