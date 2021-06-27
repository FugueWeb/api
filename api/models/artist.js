const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true},
    url: {type: String, required: true},
	image: {type: String, required: true},
	genre: {type: String, required: true},
    short_desc: {type: String, required: true},
	desc: {type: String, required: true}
});

module.exports = mongoose.model('Artist', artistSchema);