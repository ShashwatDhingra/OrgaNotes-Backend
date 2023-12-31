const express = require('express');
const app = express();
require('dotenv').config();

const authRouter = require('./routes/auth_routes')
const noteRouter = require('./routes/notes_routes')

app.use(express.json())
app.use('/auth',  authRouter)
app.use('/notes', noteRouter)

module.exports = app;