import { Product } from './Product';
import { db } from "../config/db";
import Sequelize from "sequelize";

export enum CATEGORIES {
  MEAT = "MEAT",
  VEGETABLE = "VEGETABLE",
  FRUIT = "FRUIT",
}

export interface CategoryAttributes {
  id: number;
  name: CATEGORIES;
}

export interface CategoryInterface
  extends Sequelize.Model,
    CategoryAttributes {}

export const Category = db.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

