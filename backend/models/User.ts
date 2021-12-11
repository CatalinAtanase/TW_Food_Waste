import { db } from "../config/db";
import Sequelize from "sequelize";

export interface userAttributes {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  firstName?: string;
  lastName?: string;
}

export interface UserInterface extends Sequelize.Model, userAttributes {}

export const User: Sequelize.ModelCtor<UserInterface> = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: [6, 20],
      },
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: true }
);
