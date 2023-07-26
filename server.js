const express = require('express');
const router = require('./routes/index')
const { PORT } = require('./config/environment');
const { dbConnection } = require('./database/connection');
const syncDatabase = require('./database/sync');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(router);

dbConnection();
syncDatabase();

app.listen(PORT, console.log(`Backend is running on Port: ${PORT}`));

