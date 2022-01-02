import { Response } from "express";

export const error500 = (res: Response, error: any) => {
  console.log(error);
  res.statusCode = 500;
  return res.json({ message: "Something went wrong!", error });
};

export const customErrorMessage = (
  res: Response,
  status: number,
  error: string
) => {
  res.statusCode = status
  return res.json({ error });
};
