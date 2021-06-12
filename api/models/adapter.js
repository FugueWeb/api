const mongoose = require('mongoose');

const adapterSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('ADAPTER', adapterSchema);