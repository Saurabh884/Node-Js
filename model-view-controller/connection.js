const mongoose = require("mongoose");

async function connectWithMongodb(url){
    return mongoose.connect(url)
    
}

module.exports = {
    connectWithMongodb,
};