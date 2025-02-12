import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Rooms from "./models/roomModel";
import Bookings from "./models/bookingModel";
import Payment from "./models/pyamentModel";

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
User.hasMany(Rooms, {
  foreignKey: "userId",
});
//product dherai user sanga belong huna sakxa
Rooms.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Bookings, { foreignKey: "userId" });
Bookings.belongsTo(User, {
  foreignKey: "userId",
});

Payment.hasOne(Bookings, { foreignKey: "paymentId" });
Bookings.belongsTo(Payment, {
  foreignKey: "paymentId",
});

Rooms.hasMany(Bookings, { foreignKey: "roomId" });
Bookings.belongsTo(Rooms, {
  foreignKey: "roomId",
});

export default sequelize;
