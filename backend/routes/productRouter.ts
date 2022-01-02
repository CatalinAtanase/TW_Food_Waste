import express from "express";
import { productController } from "../controllers/productController";

export const productRouter = express.Router();

productRouter.get('', productController.getAll)

