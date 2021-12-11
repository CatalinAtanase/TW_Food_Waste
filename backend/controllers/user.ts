import { User, UserInterface } from './../models/User';
import { Response, Request } from "express";

export const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users: UserInterface[] = await User.findAll();
      res.status(200).send(users)
    } catch (error) {
      console.log(error);
    }
  },
};
