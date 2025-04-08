const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
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

module.exports = mongoose.model('User', userSchema);