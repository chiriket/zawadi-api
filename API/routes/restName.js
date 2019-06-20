var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;


const RestName = require("../models/RestName");

// admin functions

router.get('/rest', (req, res) => {
    res.render('restName', {

    })
})

router.get('/names', (req, res) => {
    RestName.find((err, restName) => {

        if (!err) {
            res.status(200).render('restName', {
                restName: restName
            })
        } else {
            res.status(404).json({
                msg: error.message
            });
            console.log("Error in Retrieving RestNames: " + JSON.stringify(err, undefined, 2))
        }
    })
})

//add RestName
router.post('/addRest', (req, res) => {
    var restName = new RestName({
        name: req.body.name
    });
    restName.save((err, docs) => {
        if (!err) {
            res.status(200).send(docs);

        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving RestName: " + JSON.stringify(err, undefined, 2))
        }
    });
});

//get RestName by id
//get RestName by id
router.get('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    RestName.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            console.log("Error in Retrieving RestNames: " + JSON.stringify(err, undefined, 2))
        }

    });

});

//get element by  id and redirect edit
router.get('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    RestName.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).redirect("/edit");
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Retrieving RestNames: " + JSON.stringify(err, undefined, 2))
        }

    });

});

router.post('/:id/delete', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    RestName.findByIdAndDelete(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).redirect("/admin");
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving RestName: " + JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router;