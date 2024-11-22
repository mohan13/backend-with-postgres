import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Product from "./models/productModel";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => console.log(err));

sequelize
  .sync({ force: false })
  .then(() => console.log("Drop and re-sync db."));

//relationship
//user ko dherai product huna sakxa
User.hasMany(Product, {
  foreignKey: "userId",
});
//product dherai user sanga belong huna sakxa
Product.belongsTo(User, {
  foreignKey: "userId",
});

export default sequelize;
