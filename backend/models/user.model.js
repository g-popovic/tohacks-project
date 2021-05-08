const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
	{
		activityId: { type: Number, required: true },
		totalPoints: { type: Number, required: true },
		units: { type: Number, required: true }
	},
	{ _id: false, timestamps: { updatedAt: false } }
);

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	country: { type: String, required: true },
	entries: [entrySchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
