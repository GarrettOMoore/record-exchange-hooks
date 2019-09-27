const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collectionSchema = new Schema ({
	user_id: {
		type: Schema.Types.ObjectId, ref: 'User'
	}, 
	title: {
		type: String
	},
	artist: {
		type: Number
	},
	image: {
    type: String
	},
	year: {
		type: Number,
	},
	label: {
		String
	},
	genre: {
		type: String
	}
})

collectionSchema.set('toObject', {
	transform: function (doc, ret, options)  {
		let returnJson = {
			_id: ret._id,
			title: ret.title,
			artist: ret.artist,
			image: ret.image,
			year: ret.year,
			label: ret.label,
			genre: ret.genre
		}
		return returnJson;
	}
});

module.exports = mongoose.model('Collection', collectionSchema);