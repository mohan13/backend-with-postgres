"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const sequelize = new sequelize_1.Sequelize(dbConfig_1.default.DB, dbConfig_1.default.USER, dbConfig_1.default.PASSWORD, {
    host: dbConfig_1.default.HOST,
    dialect: dbConfig_1.default.dialect,
    port: 5432,
    pool: {
        acquire: dbConfig_1.default.pool.acquire,
        min: dbConfig_1.default.pool.min,
        max: dbConfig_1.default.pool.max,
        idle: dbConfig_1.default.pool.idle,
    },
});
sequelize
    .authenticate()
    .then(() => {
    console.log("connected");
})
    .catch((err) => {
    console.log(err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
