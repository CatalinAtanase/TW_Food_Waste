import { Response, Request } from "express";
import { Product } from "../models/Product";

export const productController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      return res.json(products)
    } catch (error) {
      
    }
  }
}