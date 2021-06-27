const mongoose = require('mongoose');

const tlycsSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    evaluator: {type: String, required: true},
	image: {type: String, required: true},
    title: {type: String, required: true},
    title_program: {type: String, required: true},
    short_desc: {type: String, required: true},
	desc: {type: String, required: true},
    info: {type: String, required: true},
    donate_fiat: {type: String, required: true},
    last_update: {type: String, required: true}
});

module.exports = mongoose.model('TLYCS', tlycsSchema);