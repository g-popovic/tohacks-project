const router = require('express').Router();

router.get('/test', (req, res) => {
	res.send('bruh');
});

module.exports = router;
