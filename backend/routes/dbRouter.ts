import { dbController } from '../controllers/dbController';
import express from "express";

export const dbRouter = express.Router();

dbRouter.get('/reset', dbController.reset)
