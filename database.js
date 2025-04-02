const mongoose = require('mongoose');

function ConnectToDB(){
    return mongoose.connect(process.env.MONGODB_URI)

}

module.exports = ConnectToDB;