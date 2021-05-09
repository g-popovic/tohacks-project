const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user.model.js');
const {itemScoreBoard} = require('../utils/data.js');
const {authUser} = require('../middleware/auth.js')

router.get('/test', (req, res) => {
	res.send('bruh');
});

router.post('/register', async function (req, res) {
	try {
		const { email, password, city } = req.body;
		const newuser = await new User({
			email,
			password: await bcrypt.hash(password, 10),
			city
		}).save();

		req.session.user = { id: newuser._id };
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
});

router.post('/login', async function (req, res) {
	const { password, email } = req.body;
	User.findOne({ email: email }, async function (err, foundUser) {
		if (err) {
			res.sendStatus(500);
		} else {
			if (!foundUser) return res.status(401).send('Incorrect email');

			const isCorrect = await bcrypt.compare(password, foundUser.password);
			if (isCorrect) {
				req.session.user.id = foundUser.id;
				res.sendStatus(200);
			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.post('/new-entry', authUser, async (req,res) => {
	const {activityId,units} = req.body;
 	const activity = itemScoreBoard[activityId];
	User.updateOne({_id: req.user.id}, {$push: {entries: {
       activityId,
	   totalPoints: units * points,
	   units
	}}})
} )


router.get("/my-activites", async function(req,res){

    User.findById({_id: req.user.id }, function(err, results){
		if(err){
			res.sendStatus(404)
		} else {
			res.json(results.entries.map(el =>(
				{...el, ...itemScoreBoard[el.activityId]}
			)))

		}
	})




})










module.exports = router;
