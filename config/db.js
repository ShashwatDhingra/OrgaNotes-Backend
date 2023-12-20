const mongoose = require('mongoose')

const mongoPass = process.env.MONGO_PASS

// MongoDb connection URI
const mongoURI = `mongodb+srv://flutter_dev:${mongoPass}@cluster0.lhobowv.mongodb.net/OrgaNotes`;
const dbConnection = mongoose.createConnection(mongoURI).on('open', () => {
    console.log('Connected to MongoDB Successfully');
}).on('error', () => {
    console.log("Error while connecting to MongoDb");
})

module.exports = dbConnection;