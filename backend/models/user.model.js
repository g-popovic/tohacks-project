const mongoose = require('mongoose');

// CO2 is measured in KILOGRAMS
const entrySchema = new mongoose.Schema(
	{
		activityId: { type: Number, required: true },
		amount: { type: Number, required: true },
		co2: { type: Number, required: true }
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
