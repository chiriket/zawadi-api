var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;


const RestName = require("../models/RestName");

//get all RestNames
router.get('/allRestNames', (req, res) => {
    RestName.find((err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(404).json({
                msg: error.message
            });
            console.log("Error in Retrieving RestNames: " + JSON.stringify(err, undefined, 2))
        }
    })
})

//get RestName by id
router.get('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    RestName.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Retrieving RestNames: " + JSON.stringify(err, undefined, 2))
        }

    });

});

//add RestName
router.post('/addRestName', (req, res) => {
    var RestName = new RestName({
        name: req.body.name
    });
    RestName.save((err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving RestName: " + JSON.stringify(err, undefined, 2))
        }
    });
});

//update RestName
router.put('/:id/edit', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    var RestNames = {
        name: req.body.name
    };
    RestName.findByIdAndUpdate(req.params.id, {
        $set: RestNames
    }, {
        new: true
    }, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving RestNames: " + JSON.stringify(err, undefined, 2))
        }
    });
})

router.delete('/:id/delete', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    RestName.findByIdAndDelete(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving RestName: " + JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router;