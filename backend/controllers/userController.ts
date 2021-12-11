import { error500, customErrorMessage } from "../utils/serverMessages";
import { User, UserInterface } from "../models/User";
import { Response, Request } from "express";
import { Op } from "sequelize";

export const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users: UserInterface[] = await User.findAll();
      res.status(200).send(users);
    } catch (error) {
      error500(res, error);
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      if (!id) {
        res.sendStatus(400);
      }
      const user = await User.findByPk(id);
      if (!user) {
        res.sendStatus(404);
      }
      res.status(200).json(user);
    } catch (error) {
      error500(res, error);
    }
  },
  getByUsername: async (req: Request, res: Response) => {
    try {
      const username: string = req.params.username;
      if (!username) {
        res.sendStatus(400);
      }
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      error500(res, error);
    }
  },
  addUser: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      if (!email || !password || !username) {
        res.sendStatus(400);
      }
      let user = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });
      if (user) {
        customErrorMessage(
          res,
          400,
          "There is already a user registered with this username/email."
        ); // Don't want to say this email is in use
      }
      user = await User.create(req.body);
      res.status(201).json({message: 'Account created succesfully!', user})
    } catch (error) {
      error500(res, error);
    }
  },
};
