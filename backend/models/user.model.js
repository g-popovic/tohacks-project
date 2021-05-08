const userSchema = new mongoose.schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	city: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
