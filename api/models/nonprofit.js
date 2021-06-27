const mongoose = require('mongoose');

const nonprofitSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	evaluatorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Evaluator',
		require: true
	},
	name: {type: String, required: true},
	url: {type: String, required: true},
	address: {type: String, required: true},
	image: {type: String, required: true},
	logo: {type: String, required: true},
	desc: {type: String, required: true},
	short_desc: {type: String, required: true},
	stats: { 
        metric1: String, 
        metric2: Number
    }
});

module.exports = mongoose.model('Nonprofit', nonprofitSchema);