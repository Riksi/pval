var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage });

const Item = require('../models/Item.js');

exports.addItem = (req, res) => {
	//TODO:
  //[] Handle file upload if appropriate
	//[] Also later to consider where image file
	//   will be stored
  //[]

	params = {
		name: req.body.name||'',
		story: req.body.story||'',
		collexion: req.params.id||null,
    day: req.body.day||null,
	};

	['time','place'].forEach(function(param){
		var maybeParam = req.body[param];
		if(maybeParam){
			params[param] = maybeParam;
		}
	})

	//TODO: add imgURL to params

	var item = new Item(params);
	item.save((err,item) => {
		if(err){console.log(err);
		res.send('Error!')}
		else{
		res.json(item)
	}
	});
};

exports.getItem = (req,res) => {
	id = req.params.item_id;
	Item.findById(id, (err,item) => {
		res.json(item);
	});
}

exports.editItem = (req, res) => {
	id = req.params.item_id;
	params = {}

	//TODO handle newly uploaded image

	['name','imgURL','time','place','story'].forEach(function(param){
		var maybeParam = req.body[param];
		if(maybeParam){
			params[param] = maybeParam;
		}
	})

	Item.findByIdAndUpdate(id,{$set: params},
	(err,item)=>{
		if(err){console.log(err);}
		else{res.json(item);}
	});
}

exports.eraseItem = (req, res) => {
	id = req.params.item_id;
	Item.findByIdAndRemove(id);
}
