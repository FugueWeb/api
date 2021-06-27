const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Nonprofit = require('../models/nonprofit');
const Evaluator = require('../models/evaluator');

router.get('/', (req, res, next) => {
    Nonprofit.find()
        .select('id name url address logo image short_desc desc evaluatorId stats')
        .populate('evaluatorId', 'name')
        .exec()
        .then(docs => {
            const response = docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    url: doc.url,
                    address: doc.address,
                    logo: doc.logo,
                    image: doc.image,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    evaluatorId: doc.evaluatorId,
                    stats: doc.stats,
                    request: {
                        type: 'GET',
                        url: 'api/v0/nonprofits/' + doc.id
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
    //make sure evaluator exists
    console.log(req.body);
    Evaluator.findById(req.body.evaluatorId)
        .then(evaluatorId => {
            if (!evaluatorId) {
                return res.status(404).json({
                    message: "Evaluator not found. Check evaluator ID"
                });
            }
            const nonprofit = new Nonprofit({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                url: req.body.url,
                address: req.body.address,
                logo: req.body.logo,
                image: req.body.image,
                short_desc: req.body.short_desc,
                desc: req.body.desc,
                evaluatorId: req.body.evaluatorId,
                stats: req.body.stats,
            });
            return nonprofit.save()
        })
        .then(result => {
            res.status(201).json({
                message: "Nonprofit created",
                createdNonprofit: {
                    name: result.name,
                    id: result.id,
                    request: {
                        type: 'GET',
                        url: 'api/v0/nonprofits/' + result.id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Evaluator not found",
                error: err
            })
        });
});

router.get('/:nonprofitId', (req, res, next) => {
    const id = req.params.nonprofitId;
    Nonprofit.findById(id)
        .select('id name url address logo image short_desc desc evaluatorId stats')
        .populate('evaluatorId')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    id: doc.id,
                    name: doc.name,
                    url: doc.url,
                    address: doc.address,
                    logo: doc.logo,
                    image: doc.image,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    evaluatorId: doc.evaluatorId,
                    stats: doc.stats,
                    request: {
                        type: 'GET',
                        url: 'api/v0/nonprofits'
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

router.patch('/:nonprofitId', (req, res, next) => {
    const id = req.params.nonprofitId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Nonprofit.update({
        id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message: 'Nonprofit updated',
            request: {
                type: 'GET',
                url: 'api/v0/nonprofits/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:nonprofitId', (req, res, next) => {
    const id = req.params.nonprofitId;
    Nonprofit.deleteOne({
            id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Nonprofit deleted',
                request: {
                    type: 'POST',
                    url: 'api/v0/nonprofits',
                    body: {
                        name: 'String',
                        url: 'String',
                        address: 'String',
                        url: 'String',
                        image: 'String',
                        logo: 'String',
                        desc: 'String',
                        short_desc: 'String',
                        evaluatorId: 'String',
                        stats: {
                            metric1: 'String',
                            metric2: 'Number'
                        }
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