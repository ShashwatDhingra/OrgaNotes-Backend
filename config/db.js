const mongoose = require('mongoose')

// MongoDb connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/OrgaNotes';
const dbConnection = mongoose.createConnection(mongoURI).on('open', () => {
    console.log('Connected to MongoDB Successfully');
}).on('error', () => {
    console.log("Error while connecting to MongoDb");
})

module.exports = dbConnection;