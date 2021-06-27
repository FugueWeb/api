const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Evaluator = require('../models/evaluator');

router.get('/', (req, res, next) => {
    Evaluator.find()
        .select('id name url logo image focus short_desc desc')
        .exec()
        .then(docs => {
            const response = docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    url: doc.url,
                    logo: doc.logo,
                    image: doc.image,
                    focus: doc.focus,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    request: {
                        type: 'GET',
                        url: 'api/v0/evaluators/' + doc.id
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
    const evaluator = new Evaluator({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        url: req.body.url,
        logo: req.body.logo,
        image: req.body.image,
        focus: req.body.focus,
        short_desc: req.body.short_desc,
        desc: req.body.desc
    });

    evaluator.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "New evaluator created",
            createdEvaluator: {
                id: result.id,
                name: result.name,
                request: {
                    type: 'GET',
                    url: '/api/v0/evaluators/' + result.id
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

router.get('/:evaluatorId', (req, res, next) => {
    const id = req.params.evaluatorId;
    Evaluator.findById(id)
        .select('id name url logo image focus short_desc desc')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    id: doc.id,
                    name: doc.name,
                    url: doc.url,
                    logo: doc.logo,
                    image: doc.image,
                    focus: doc.focus,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    request: {
                        type: 'GET',
                        url: 'api/v0/evaluators'
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

router.patch('/:evaluatorId', (req, res, next) => {
    const id = req.params.evaluatorId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Evaluator.update({
        id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message: 'Evaluator updated',
            request: {
                type: 'GET',
                url: 'api/v0/evaluators/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:evaluatorId', (req, res, next) => {
    const id = req.params.evaluatorId;
    Evaluator.deleteOne({
            id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Evaluator deleted',
                request: {
                    type: 'POST',
                    url: 'api/v0/evaluators',
                    body: {
                        name: 'String',
                        url: 'String',
                        image: 'String',
                        logo: 'String',
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