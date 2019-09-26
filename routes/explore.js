const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route for signup
router.post('/', (req, res) => {
	var search = req.body.query;
	var url = 'https://api.discogs.com/database/search?q='+ encodeURI(search) + '&type=master&key=' + 'iTRElvXmFbRQpLPRNyHY' + '&secret=' + 'TQWdIVlQOVjgQLmMIBSxzvdXsyaPEaEP'
	axios.get(url).then((result) => {
		res.json({
			data: result.data
		})
	}).catch((error) => {
		res.json({
			error: error
		})
	})
});

module.exports = router;