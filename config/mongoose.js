const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

// setting up the database

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to mongodb"));

db.once('open', function(){

    console.log("connected to database :: Mongodb");

});

module.exports = db;