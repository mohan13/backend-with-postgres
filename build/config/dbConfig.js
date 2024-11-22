"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "admin",
    DB: "postgresDB",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000,
    },
};
exports.default = dbConfig;
