const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = 4000;

const bugRoutes = express.Router();
let Bug = require('./bug.model');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/bugs',{ useNewUrlParser: true})
const connection = mongoose.connection;

connection.once('open',function() {
    console.log("Mongo DB connected successfully");
})

bugRoutes.route('/').get(function(req, res) {
    Bug.find(function(err, bugs) {
        if (err) {
            console.log(err);
    } else {
        res.json(bugs);
    }
    });
});


bugRoutes.route('/users/').get(function(req, res) {
    User.find(function(err, user) {
        if (err) {
            console.log(err);
    } else {
        res.json(user);
    }
    });
});

bugRoutes.route('/create').post(function(req, res) {
    let bug = new Bug(req.body);
    bug.save()
        .then(bug => {
            res.status(200).json({ bug: "bug added success" });
    })
        .catch(err => {
            res.status(400).send("adding bug failed");
    });
});

bugRoutes.route('/update/:id').post(function(req, res) {
    Bug.findById(req.params.id, function(err, bug) {
    if (!bug) {
        res.status(404).send("Data not found");
    } else {
        bug.description = req.body.description;
        bug.date = Date.parse(req.body.date);
        bug.assignee = req.body.assignee;
        bug.priority = req.body.priority;
        bug.completed = req.body.completed;

    bug.save()
        .then(bug => {
            res.json("Bug updated");
        })
        .catch(err => {
        res.status(400).send("Update not possible");
            });
        }
    });
});

bugRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Bug.findById(id, function(err, bug) {
        res.json(bug);
    });
});

bugRoutes.route('/search').get(function(req, res) {
    const result = Bug.filter(found => new RegExp(`^${req.query.q}`).test(found));
    res.json(result);
});

bugRoutes.route('/:id').delete((req, res) => {
    Bug.findByIdAndDelete(req.params.id)
    .then(() => res.json("Bug deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});


/// Login Auth Starts Here ///

//Add a user

app.use('/bugs', bugRoutes);

app.listen(PORT, function() {
    console.log("Server is running on PORT: " + PORT);
});