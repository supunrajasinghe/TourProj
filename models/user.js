const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fName: String,
    lName: String,
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return err;
        this.password = hash;
        next();
    });
});

userSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};

module.exports = mongoose.model('user', userSchema);
