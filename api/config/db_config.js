const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

//INITIATE CONNECTION TO THE DATABSE 
module.exports = mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false}, (err) => {
    if (!err) console.log("Sucessfully connected to Database | MongoDB");
});