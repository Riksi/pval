const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	
	collxn: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Collection'
	},
	name: String,
	imgURL: String,
	
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;