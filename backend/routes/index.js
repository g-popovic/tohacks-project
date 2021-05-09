const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user.model.js');
const { itemScoreBoard } = require('../utils/data.js');
const { authUser } = require('../middleware/auth.js');

router.get('/test', (req, res) => {
	res.send('bruh');
});

router.post('/register', async function (req, res) {
	try {
		const { email, password, country } = req.body;
		const newuser = await new User({
			email,
			password: await bcrypt.hash(password, 10),
			country
		}).save();

		req.session.user = { id: newuser._id };
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
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
				req.session.user = { id: foundUser._id };
				res.sendStatus(200);
			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.post('/new-entry', authUser, async (req, res) => {
	const { activityId, amount } = req.body;
	const activity = itemScoreBoard[activityId];
	console.log({ activity, amount });
	await User.updateOne(
		{ _id: req.user.id },
		{
			$push: {
				entries: {
					activityId,
					co2: amount * activity.co2PerUnit,
					amount
				}
			}
		}
	);
	res.sendStatus(200);
});

router.get('/status', (req, res) => {
	if (req.session.user && req.session.user.id) {
		res.json({ isAuthed: true });
	} else {
		res.json({ isAuthed: false });
	}
});

router.post('/logout', (req, res) => {
	req.session.user = null;
	res.sendStatus(200);
});

router.get('/my-activites', authUser, async (req, res) => {
	const result = await User.findById(req.user.id).lean();

	if (!result) return res.sendStatus(404);

	console.log({ entries: result.entries, activity: itemScoreBoard[0] });

	res.json(result.entries.map(el => ({ ...el, ...itemScoreBoard[el.activityId] })));
});

router.get('/statistic', async function (req, res) {
	const result = await User.aggregate([
		{ $unwind: '$entries' },
		{
			$group: {
				_id: '$country',
				co2: { $sum: '$entries.co2' }
			}
		},
		{
			$sort: {
				co2: 1
			}
		}
	]);
	res.json(result);
});

module.exports = router;
