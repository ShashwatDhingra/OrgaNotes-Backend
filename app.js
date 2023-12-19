const express = require('express');
const userRouter = require('./routes/auth_routes')
const app = express();
require('dotenv').config();

app.use(express.json())
app.use('/auth',  userRouter)

module.exports = app;