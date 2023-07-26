require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_HOST = process.env.DB_HOST
const PORT = process.env.PORT;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;
module.exports = { PORT, DB_NAME, DB_USERNAME, DB_HOST, BACKEND_SERVER_PATH };