import mssql from "mssql";
import { config } from "dotenv";

config();

const dbConfig = {
    user: process.env.DB_USER,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export const dbPool = new mssql.ConnectionPool(dbConfig);