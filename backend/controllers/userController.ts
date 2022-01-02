import { Request, Response } from "express";
import { Op } from "sequelize";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { customErrorMessage, error500 } from "../utils/serverMessages";

export const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      return res.status(200).send(users);
    } catch (error) {
      return error500(res, error);
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const user = await User.findByPk(id, {include: [Product]});
      if (!user) {
        return res.sendStatus(404);
      }
      return res.status(200).json(user);
    } catch (error) {
      return error500(res, error);
    }
  },
  getByUsername: async (req: Request, res: Response) => {
    try {
      const username: string = req.params.username;
      if (!username) {
        return res.sendStatus(400);
      }
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return error500(res, error);
    }
  },
  addUser: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      if (!email || !password || !username) {
        return res.sendStatus(400);
      }
      let user = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });
      if (user) {
        return customErrorMessage(
          res,
          400,
          "There is already a user registered with this username/email."
        ); // Don't want to say this email is in use
      }
      user = await User.create(req.body);
      return res.status(201).json({ message: "Account created succesfully!", user });
    } catch (error) {
      return error500(res, error);
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { username, firstName, lastName } = req.body;
      const userId = parseInt(req.params.id);
      let user = await User.findByPk(userId);
      if(!user) {
        return customErrorMessage(res, 404, "User not found!")
      }
      if (!username) {
        return customErrorMessage(res, 400, "Username is missing!");
      }
      const userWithUsername = await User.findOne({ where: { username } });
      if (userWithUsername && userWithUsername.id !== userId) {
        return customErrorMessage(res, 403, "Username already in use!");
      }
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      user = await user.save();

      return res.status(200).json({ message: "Info updated succesfully!", user });
    } catch (error) {
      return error500(res, error);
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.sendStatus(400);
      }
      await user.destroy();
      res.statusCode = 200
      return res.json({ message: "Account deleted!" });
    } catch (error) {
      return error500(res, error);
    }
  },
};
