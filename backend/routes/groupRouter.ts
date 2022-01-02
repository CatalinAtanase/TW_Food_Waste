import express from "express";
import { groupController } from "../controllers/groupController";

export const groupRouter = express.Router();

groupRouter.get("", groupController.getAll);
groupRouter.get("/:id/", groupController.getById);
groupRouter.post("", groupController.addGroup);
groupRouter.patch("/:id/", groupController.updateGroup);
groupRouter.delete("/:id/", groupController.deleteGroup);
groupRouter.post("/:id/", groupController.addUsersToGroup);
groupRouter.delete("/delete/:id/", groupController.deleteUsersFromGroup);
