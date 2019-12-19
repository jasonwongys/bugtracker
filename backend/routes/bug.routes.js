const bugRoutes = require('express').Router();
let Bug = require('../models/bug.model');

// Display all bugs
bugRoutes.route('/buglist').get(function(req,res) {
    Bug.find(function(err, bugs) {
        if (err) {
            console.log(err);

        }else {
            res.json(bugs)
        }
    })
})

//Create a bug
bugRoutes.route('/create').post(function(req,res) {
    let bug = new Bug(req.body);
    bug.save()
        .then(bug => {
            res.status(200).json({'bug' : 'bug added success'})
        })
        .catch(err => {
            res.status(400).send('adding bug failed');
        });
})

bugRoutes.route('/update/:id').post(function(req,res) {
    Bug.findById(req.params.id, function(err, bug) {
        if(!bug) {
            res.status(404).send('Data not found');
        } else {
            bug.description = req.body.description;
            bug.date = Date.parse(req.body.date);
            bug.assignee = req.body.assignee;
            bug.priority = req.body.priority;
            bug.completed = req.body.completed;

            bug.save().then(bug => {
                res.json('Bug updated');
            })
            .catch(err=> {
                res.status(400).send("Update not possible");
            })
        }
    });
})

bugRoutes.route('/:id').get(function(req,res) {
    let id = req.params.id;
    Bug.findById(id, function(err, bug) {
        res.json(bug);
    })
})

bugRoutes.route('/search').get(function(req,res) {
    const result = Bug.filter(found => 
        new RegExp(`^${req.query.q}`).test(found)
);
    res.json(result);
});

bugRoutes.route('/:id').delete((req,res)=> {
    Bug.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Bug deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = bugRoutes;
