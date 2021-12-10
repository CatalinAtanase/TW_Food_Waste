import { db } from "../config/db";
import { Response, Request } from "express";

export const dbController = {
  reset: (req: Request, res: Response) => {
    db
      .sync({ force: true })
      .then(() => {
        res.status(201).send({
          message: "Database reset",
        });
      })
      .catch(() => {
        res.status(500).send({
          message: "Database reset error",
        });
      });
  },
};
