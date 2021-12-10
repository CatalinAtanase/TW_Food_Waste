import {Sequelize} from "sequelize";

export const db = new Sequelize('food_waste', 'root', '',{
  dialect: 'mysql',
  host: 'localhost',
  define: { timestamps: true },
});
