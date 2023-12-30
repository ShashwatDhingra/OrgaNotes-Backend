const express = require('express');
const authRouter = require('./routes/auth_routes')
const app = express();
require('dotenv').config();

app.use(express.json())
app.use('/auth',  authRouter)

module.exports = app;