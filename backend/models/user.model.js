<<<<<<< HEAD
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true,},
    password: String,
    city: String
=======
const userSchema = new mongoose.schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	city: { type: String, required: true }
>>>>>>> fa945f620a0ecb91e5bf1255ed08bd6154f69905
});

const User = mongoose.model('User', userSchema);

module.exports = User;
