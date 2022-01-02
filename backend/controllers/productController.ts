import { Response, Request } from "express";
import { Product } from "../models/Product";
import { error500 } from "../utils/serverMessages";

export const productController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      return error500(res, error);
    }
  },
  getbyId: async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.sendStatus(404);
      }
      return res.status(200).json(product);
    } catch (error) {
      return error500(res, error);
    }
  },
  addProduct: async (req: Request, res: Response) => {
    try {
      const { name, expirationDate, categoryId, userId, quantity } = req.body;
      if (!name || !categoryId || !userId || !quantity) {
        return res.sendStatus(400);
      }
      const product = await Product.create(req.body);
      return res
        .status(200)
        .json({ product, message: "Product added succesfully!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  getUserProducts: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.sendStatus(400);
      }
      const products = await Product.findAll({
        where: {
          userId,
        },
      });
      return res.json(products);
    } catch (error) {
      return error500(res, error);
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      let product = await Product.findByPk(id);
      if (!product) {
        return res.sendStatus(404);
      }

      const { name, isAvailable, expirationDate, quantity, categoryId } =
        req.body;

      product.name = name;
      product.isAvailable = isAvailable;
      product.expirationDate = expirationDate;
      product.quantity = quantity;
      product.categoryId = categoryId;
      product = await product.save();

      return res
        .status(200)
        .json({ message: "Product updated succesfully!", product });
    } catch (error) {
      return error500(res, error);
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.sendStatus(404);
      }
      await product.destroy();
      res.statusCode = 200;
      return res.json({ message: "Product deleted!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  claimProduct: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.sendStatus(404);
      }

      if(product.claimedBy) {
        return res.status(400).json({message: "This product was already claimed"})
      }

      product.claimedBy = 1; // TODO Change this to req.user
      await product.save();

      return res.status(200).json({ message: "Product claimed!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  unclaimProduct: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.sendStatus(404);
      }

      if(!product.claimedBy) {
        return res.sendStatus(400)
      }

      product.claimedBy = null;
      await product.save()

      return res.status(200).json({message: "Product unclaimed"})
    } catch (error) {
      
    }
  }
};
