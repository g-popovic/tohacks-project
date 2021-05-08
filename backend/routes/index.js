const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = require('express').Router();


const User = require('../models/user.model.js')
router.get('/test', (req, res) => {
	res.send('bruh');
});

module.exports = router;

router.post("/register", async  function(req,res){
	try {
		const {email,password,city} = req.body;
		const newuser = await new User(
		 {
			email,
			password: await bcrypt.hash(password, 10,)  ,
	        city
		}).save();

		req.session.user = {id: newuser._id};
		res.sendStatus(200)
	} catch (err) {
		res.sendStatus(500)
	}
});


router.post("/login", async function(req,res){

	const {password, email} = req.body;
     User.findOne({email:email}, async 	 function(err, foundUser){
        if(err){
			res.sendStatus(500)
		}else{
			if (!foundUser) return res.status(401).send('Incorrect email')

			 const isCorrect = await bcrypt.compare(password, foundUser.password)
			if (isCorrect) {
				req.session.user.id = foundUser.id;
				res.sendStatus(200)
			} else {
				res.sendStatus(404)
			}
		}

	 })

});
