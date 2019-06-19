var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;


const Item = require("../models/Item");


// edit is protected
router.get('/addItem', (req, res) =>
    res.render('addItem', {
        // name: req.user.name
    })
);

//get all tasks
router.get('/allItems', (req, res) => {

    // Item.findOne().populate('restName', 'category').exec(function (err, c) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log(c.restName.name + c.category.name);
    // });

    Item.find({}).populate([{
                "restName": "restName",
                "match": {
                    "name": req.restName
                }
            },
            {
                "category": "category",
                "match": {
                    "name": req.restName
                }
            }
        ])
        .then((items) => {
            console.log(items);
        }).catch((err) => {
            console.log(err);
        });
})

// //get all tasks
// router.get('/allItems', (req, res) => {

//     Item.find((err, item) => {
//         if (!err) {
//             res.status(200).render('allItems', {
//                 item: item
//             })
//         } else {

//             console.log("Error in Retrieving Items: " + JSON.stringify(err, undefined, 2))
//         }
//     })
// })

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