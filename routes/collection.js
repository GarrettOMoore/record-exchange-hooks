const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');

router.post('/', (req, res) => {
	Collection.findOne({title: req.body.title}, (err, album) => {
		if (album) {
			res.json({type: 'error', message: 'This album already exists in database!'})
		} else {
			let collection = new Collection ({
				user_id: req.body.id,
				title: req.body.title,
				artist: req.body.artist,
				image: req.body.image,
				year: req.body.year,
				label: req.body.label,
				genre: req.body.genre
			})
			 collection.save( (err, collection) => {
				if (err) {
					res.json({type: 'error', message: 'Database Error adding album'})
				} else {
					res.json(collection)
			};
		})
	 }
	})
})

router.get('/:id', (req, res) => {
	Collection.find({user_id: req.params.id}, (err, items) => {
			if (!err) {
				res.status(200).json(items)
			} else {
				console.log("UH OHHH")
				res.status(500).json({err})
			}
		});
	});

router.get('/delete/:id', (req, res) => {
	Collection.deleteOne({_id: req.params.id}, (err) => {})
})

module.exports = router;