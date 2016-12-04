const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
	name: String,
	place: String,
	time: Date,
	tags: [String],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

//function to add item???

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;