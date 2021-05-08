

const userSchema = new mongoose.schema({
    email: {type: String, unique: true},
    password: String,
    city: String
});

const User = mongoose.model('User', userSchema);

module.exports = User; 
