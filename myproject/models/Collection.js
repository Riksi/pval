const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
	name: {
		type: String,
		maxlength: [50, 'Name should be less than 25 characters'],
		required: [true, 'Name is required']
	},
	tags: [{type: String, maxlength: [25, 'Tags should be less than 25 characters']}],
	description: {
		type: String,
		minlength: [25, 'Description should be at least 25 characters'],
		maxlength: [500, 'Description should be less than 500 characters'],
		required: [true, 'Description is required']
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

//function to add item???

const Collection = mongoose.model(
	'Collection',
collectionSchema);

module.exports = Collection;
