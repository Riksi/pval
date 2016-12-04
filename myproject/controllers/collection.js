const Collection = require('../models/Collection.js');
const Item = require('../models/Item.js');


exports.getCollections = (req,res) => {
	Collection.find((err,docs) => {
		res.render('collections')
	});
};

exports.addCollection = (req, res) => {
	params = {
		name: req.body.name,
		place: req.body.place
	}
	var collection = new Collection(params);
	collection.save();
	res.json({name: req.body.name});
};

exports.getCollection = (req,res) => {
	id = req.params.id;
	Collection.findById(id,(err,collection) => {
		Item.find({collxn: collection._id}, (err,items) => {
			res.json({
				collxn: collection, 
				items: items
				});
		})
	});
}

exports.editCollection = (req, res) => {
	id = req.params.id;
	params = {
		name: req.body.name
	}
	Collection.findByIdAndUpdate(id,{$set: params},
		() => res.send('Done!')
	);
}

exports.eraseCollection = (req, res) => {
	id = req.body.id;
	Collection.findByIdAndRemove(id);
}