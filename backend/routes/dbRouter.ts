import { dbController } from '../controllers/db';
import express from "express";

export const dbRouter = express.Router();

dbRouter.get('/reset', dbController.reset)
