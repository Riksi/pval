const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

//TODO:
//How to cascade deletion of items
//when collection is deleted

	collexion: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Collection',
		required: true
	},
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	imgURL: String,
	day: Number,
	month: String,
	year: Number,
	occasion: String,
	place: String,
	story: {
		type: String,
		required: [true, 'Story is required']
	}

});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
