var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;


const Category = require("../models/Category");


// edit is protected
router.get('/addCategory', (req, res) =>
    res.render('addCategory', {
        // name: req.user.name
    })
);

//get all tasks
router.get('/allCategories', (req, res) => {

    Category.find((err, category) => {
        if (!err) {
            res.status(200).render('allCategories', {
                category: category
            })
        } else {

            console.log("Error in Retrieving Categories: " + JSON.stringify(err, undefined, 2))
        }
    })
})

//get task by id
router.get('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    Category.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            console.log("Error in Retrieving Tasks: " + JSON.stringify(err, undefined, 2))
        }

    });

});

//add task
router.post('/addCat', (req, res) => {
    var category = new Category({
        name: req.body.name
    });
    category.save((err, docs) => {
        if (!err) {
            res.status(200).redirect("/cat/allCategories");
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving Category: " + JSON.stringify(err, undefined, 2))
        }
    });
});

//update task
router.put('/:id/edit', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    var category = {
        name: req.body.name
    };
    Category.findByIdAndUpdate(req.params.id, {
        $set: category
    }, {
        new: true
    }, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving tasks: " + JSON.stringify(err, undefined, 2))
        }
    });
})

router.delete('/:id/delete', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(404).send(`no record with given id : ${req.params.id}`);

    Category.findByIdAndDelete(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(404).json({
                msg: err.message
            });
            console.log("Error in Saving Task: " + JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router;