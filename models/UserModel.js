const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // To make it uniques in the entire user database
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// Static Method
userSchema.statics.signup = async function (email, password)  {
    const exists = await this.findOne({email: email});

    if (exists) {
        throw new Error(`${email} already exists`);
    }

    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(password, salt)

    const registered_user = await this.create({email:email,password:hashed_password})

    return registered_user
}


userSchema.statics.login = async function(email,password){

    const user = await this.findOne({email:email});

    if (!user) {
        throw new Error(`${email} does not exists`);
    }

    const match_password = await bcrypt.compare(password, user.password);

    if (!match_password) {
        throw new Error(`Incorrect password`);
    }

    return user
}

module.exports = mongoose.model('User', userSchema);