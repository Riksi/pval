const Collection = require('../models/Collection.js');
const Item = require('../models/Item.js');

var validate = function(req){
	req.assert('name','Name is required').notEmpty();
	req.assert('name','Name must be less than 50 characters').len(1,50);
	req.assert('description','Description is required').notEmpty();
	req.assert('description','Description must be between 25 and 500 characters').len(25,500);
	const tags = req.body.tags;
	if(typeof(tags) != 'undefined'){
		req.assert('tags').isArray();
		if(tags.length > 0){
			req.assert('tags','Tags must be less than 25 characters').isValidTagArray(25);
		}
	}
	return req.validationErrors();
}

exports.getCollections = (req,res) => {
	Collection.find((err,collections) => {
		if(err){console.log(err);}
		else{res.json(collections);}
	});
};

//TODO:
//Ensure that the get methods return the
//appropriate json object(s)
//Ensure that post, update, delete work as supposed to
//Do the same for item as well
//Form validation
//Think about switching to ES6 syntax



exports.addCollection = (req, res) => {

	const errors = validate(req);

	if (errors) {
		console.log('Fields not valid');
		res.json({'Errors': errors});
	}


	else
	{
		params = {
			name: req.body.name,
			description: req.body.description,
			tags: req.body.tags
		}
		const collection = new Collection(params);
		collection.save((err,collection) => {
			if (err){
				console.log("There were the following errors:");
				console.log(err);
				res.json({'Errors':err});
			}
			else{
				console.log('Saved a new collection called %s',collection.name);
				res.json({'Saved':collection})
			}
		});
	}
}

	exports.getCollection = (req,res) => {
		id = req.params.id;
		Collection.findById(id,(err,collection) => {
			if(err){console.log(err);}
			else{
				Item.find({collexion: collection._id}, (err,items) => {
					if (err){

						console.log(err);
						res.json({'Errors':err});
					}
					else{
						console.log('Successfully retrieved ' + collection.name)
						res.json({
							collection: collection,
							items: items
							});
					}
				})
			}
		});
	}



exports.editCollection = (req, res) => {
	id = req.params.id;

	const errors = validate(req);

	if (errors) {
		console.log('Fields not valid');
		res.json({'Errors': errors});
	}

	else {
		params = {
			name: req.body.name,
			description: req.body.description,
			tags: req.body.tags
		}

		Collection.findByIdAndUpdate(id,{$set: params},
			(err, previous) => {
				if(err){
					console.log(err);
					res.json({'Errors':err});
				}
				else{

					Collection.findById(id,(err,updated) => {
						if(err){
							console.log(err);
							res.json({'Errors':err});
						}

						else{
							console.log("Updates successfully persisted");
							res.json({
								previous: previous,
								updated: updated
							})
						}

					})
				}
			}
		);
	}
}

exports.eraseCollection = (req, res) => {
	Collection.findByIdAndRemove(req.params.id,(err,collection)=>
	{
		if(err){
			console.log("There were the following errors:");
			console.log(err);
			res.json({'Errors':err});
		}
		else{
			console.log("Successfully deleted collection "+collection.name);
			res.json(collection);
		}
	});
}
