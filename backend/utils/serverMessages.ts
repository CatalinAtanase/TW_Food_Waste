import { Response } from "express";

export const error500 = (res: Response, error: any) => {
  console.log(error);
  return res.status(500).json({ message: "Something went wrong!", error });
};

export const customErrorMessage = (
  res: Response,
  status: number,
  error: string
) => {
  return res.status(status).json({ error });
};
