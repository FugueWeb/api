const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const NFT = require('../models/nft');

router.get('/', (req, res, next) => {
    NFT.find()
        .select('id tokenID name description image external_url animation_url youtube_url background_color attributes')
        .exec()
        .then(docs => {
            const response = docs.map(doc => {
                return {
                    id: doc.id,
                    tokenID: doc.tokenID,
                    name: doc.name,
                    description: doc.description,
                    image: doc.image,
                    external_url: doc.external_url,
                    animation_url: doc.animation_url,
                    youtube_url: doc.youtube_url,
                    background_color: doc.background_color,
                    attributes: doc.attributes,
                    request: {
                        type: 'GET',
                        url: 'api/v0/nft/' + doc.id
                    }
                }
            });
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    console.log(req);
    const nft = new NFT({
        _id: new mongoose.Types.ObjectId(),
        tokenID: req.body.tokenID,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        external_url: req.body.external_url,
        animation_url: req.body.animation_url,
        youtube_url: req.body.youtube_url,
        background_color: req.body.background_color,
        attributes: req.body.attributes
    });

    nft.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "New NFT created",
            createdNFT: {
                id: result.id,
                name: result.name,
                request: {
                    type: 'GET',
                    url: '/api/v0/nft/' + result.id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:tokenID', (req, res, next) => {
    const id = req.params.tokenID;
    NFT.find({tokenID: id}, 
        'id tokenID name description image external_url animation_url youtube_url background_color attributes')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    id: doc[0].id,
                    tokenID: doc[0].tokenID,
                    name: doc[0].name,
                    description: doc[0].description,
                    image: doc[0].image,
                    external_url: doc[0].external_url,
                    animation_url: doc[0].animation_url,
                    youtube_url: doc[0].youtube_url,
                    background_color: doc[0].background_color,
                    attributes: doc[0].attributes,
                    request: {
                        type: 'GET',
                        url: 'api/v0/nft'
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid entry for provided ID"
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:nftId', (req, res, next) => {
    const id = req.params.nftId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    NFT.update({
        id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message: 'NFT updated',
            request: {
                type: 'GET',
                url: 'api/v0/nft/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:nftId', (req, res, next) => {
    const id = req.params.nftId;
    NFT.deleteOne({
            id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'NFT deleted',
                request: {
                    type: 'POST',
                    url: 'api/v0/nft',
                    body: {
                        name: 'String',
                        description: 'String',
                        image: 'String',
                        external_url: 'String',
                        animation_url: 'String',
                        youtube_url: 'String',
                        background_color: 'String',
                        attributes: 'Object Array',
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;