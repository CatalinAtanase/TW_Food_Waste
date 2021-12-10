import { db } from "../config/db";
import Sequelize from "sequelize";

export const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
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
  },
  { timestamps: true }
);
