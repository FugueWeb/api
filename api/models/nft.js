const mongoose = require('mongoose');

const nftSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    tokenID: {type: Number, required: true},
	name: {type: String, required: true},
    description: {type: String, required: true},
	image: {type: String, required: true},
    external_url: {type: String, required: true},
    animation_url: {type: String},
    youtube_url: {type: String},
    background_color: {type: String},
	attributes: [
        {
            _id : false,
            trait_type: {type: String}, 
            value: {type: String},
            display_type: {type: String}
        }
    ]
});

module.exports = mongoose.model('NFT', nftSchema);