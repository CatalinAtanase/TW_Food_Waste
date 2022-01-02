import { error500 } from "./../utils/serverMessages";
import { User } from "./../models/User";
import { Group } from "./../models/Group";
import { Response, Request } from "express";

export const groupController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const groups = await Group.findAll({ include: [User] });
      return res.status(200).json(groups);
    } catch (error) {
      return error500(res, error);
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const group = await Group.findByPk(id, { include: [User] });
      if (!group) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ group });
    } catch (error) {
      return error500(res, error);
    }
  },
  addGroup: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.sendStatus(400);
      }
      const group = await Group.create(req.body);

      return res.status(200).json({ group, message: "Group created!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  updateGroup: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const { name } = req.body;
      if (!name) {
        return res.sendStatus(400);
      }
      let group = await Group.findByPk(id);
      if (!group) {
        return res.sendStatus(404);
      }
      group.name = name;
      group = await group.save();

      return res
        .status(200)
        .json({ group, message: "Group updated succesfully!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  deleteGroup: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        res.sendStatus(400);
      }
      const group = await Group.findByPk(id);
      if (!group) {
        res.sendStatus(404);
      }
      await group.destroy();

      return res.status(200).json({ message: "Group deleted!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  addUsersToGroup: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const group = await Group.findByPk(id);
      if (!group) {
        return res.sendStatus(404);
      }
      const { users }: {users: number[]} = req.body;
      if (!users) {
        return res.sendStatus(400);
      }
      await group.addUsers(users);

      return res.status(200).json({message: "Friends added!"})
    } catch (error) {
      return error500(res, error);
    }
  },
  deleteUsersFromGroup: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const group = await Group.findByPk(id);
      if (!group) {
        return res.sendStatus(404);
      }
      const { users }: {users: number[]} = req.body;
      if (!users) {
        return res.sendStatus(400);
      }
      await group.removeUsers(users)
      return res.status(200).json({message: "Friends removed!"})
    } catch (error) {
      return error500(res, error);
    }
  }

};
