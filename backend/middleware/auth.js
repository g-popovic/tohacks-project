const mongoose = require('mongoose');

function authUser(req, res, next) {
	if (!req.session.user) return res.sendStatus(401);
	const { id } = req.session[idName];
	if (!id || !mongoose.isValidObjectId(id)) return res.sendStatus(401);
	req.customer = { id };
	next();
}

module.exports = {
	authUser
};
