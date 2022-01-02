import { User } from "./User";
import { Category } from "./Category";
import { db } from "../config/db";
import Sequelize from "sequelize";

export interface ProductAttributes {
  id: number;
  name: string;
  isAvailable: boolean;
  expirationDate?: Date;
  categoryId: number;
  userId: number;
  quantity: string;
  claimedBy?: number;
}

export interface ProductInterface extends Sequelize.Model, ProductAttributes {}

export const Product: Sequelize.ModelCtor<ProductInterface> = db.define(
  "product",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    claimedBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  }
);

Category.hasMany(Product);
Product.belongsTo(Category);
User.hasMany(Product);
Product.belongsTo(User);
