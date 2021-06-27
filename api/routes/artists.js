const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Artist = require('../models/artist');

router.get('/', (req, res, next) => {
    Artist.find()
        .select('id name url image genre short_desc desc')
        .exec()
        .then(docs => {
            const response = docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    url: doc.url,
                    image: doc.image,
                    genre: doc.genre,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    request: {
                        type: 'GET',
                        url: 'api/v0/artists/' + doc.id
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
    console.log(req.file);
    const artist = new Artist({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        url: req.body.url,
        image: req.body.image,
        genre: req.body.genre,
        short_desc: req.body.short_desc,
        desc: req.body.desc
    });

    artist.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "New artist created",
            createdArtist: {
                id: result.id,
                name: result.name,
                request: {
                    type: 'GET',
                    url: '/api/v0/artists/' + result.id
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

router.get('/:artistId', (req, res, next) => {
    const id = req.params.artistId;
    Artist.findById(id)
        .select('id name url image genre short_desc desc')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    id: doc.id,
                    name: doc.name,
                    url: doc.url,
                    image: doc.image,
                    genre: doc.genre,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    request: {
                        type: 'GET',
                        url: 'api/v0/artists'
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

router.patch('/:artistId', (req, res, next) => {
    const id = req.params.artistId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Artist.update({
        id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message: 'Artist updated',
            request: {
                type: 'GET',
                url: 'api/v0/artists/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:artistId', (req, res, next) => {
    const id = req.params.artistId;
    Artist.deleteOne({
            id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Artist deleted',
                request: {
                    type: 'POST',
                    url: 'api/v0/artists',
                    body: {
                        name: 'String',
                        url: 'String',
                        image: 'String',
                        genre: 'String',
                        desc: 'String',
                        short_desc: 'String'
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