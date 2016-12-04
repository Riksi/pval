const Item = require('../models/Item.js');


exports.addItem = (req, res) => {
	params = {
		name: req.body.name,
		place: req.body.place
	}
	var item = new Item(params);
	item.save();
	res.json({name: req.body.name});
};

exports.getItem = (req,res) => {
	id = req.params.id;
	Item.findById(id, (item) => {
		res.json(item);
	});
}

exports.editItem = (req, res) => {
	id = req.params.id;
	params = {
		name: req.body.name,
		place: req.body.place
	}
	Item.findByIdAndUpdate(id,{$set: params});
}

exports.eraseItem = (req, res) => {
	id = req.params.id;
	Item.findByIdAndRemove(id);
}