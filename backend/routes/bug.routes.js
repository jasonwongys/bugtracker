
let Bug = require('../models/bug.model');
const bugRoutes = require('express-promise-router')();
let bugsController = require('../controllers/bugs.controller');


bugRoutes.route('/')
    .get(bugsController.index);
    

bugRoutes.route('/:id')
    .get(bugsController.getBug)
    .put(bugsController.replaceBug)
    .patch(bugsController.updateBug);


//get all projects 
bugRoutes.route('/projects/:id')
    .get(bugsController.getBugAndProjects)
    .post(bugsController.newBugProjects);


bugRoutes.route('/:id').delete((req,res)=> {
    Bug.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Bug deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = bugRoutes;



//Create a bug
// bugRoutes.route('/create').post(function(req,res) {
//     let bug = new Bug(req.body);
//     bug.save()
//         .then(bug => {
//             res.status(200).json({'bug' : 'bug added success'})
//         })
//         .catch(err => {
//             res.status(400).send('adding bug failed');
//         });
// })

// bugRoutes.route('/edit/:id').post(function(req,res) {
//     Bug.findById(req.params.id, function(err, bug) {
//         if(!bug) {
//             res.status(404).send('Data not found');
//         } else {
//             bug.description = req.body.description;
//             bug.date = Date.parse(req.body.date);
//             bug.assignee = req.body.assignee;
//             bug.priority = req.body.priority;
//             bug.completed = req.body.completed;

//             bug.save().then(bug => {
//                 res.json('Bug updated');
//             })
//             .catch(err=> {
//                 res.status(400).send("Update not possible");
//             })
//         }
//     });
// })

// bugRoutes.route('/:id').get(function(req,res) {
//     let id = req.params.id;
//     Bug.findById(id, function(err, bug) {
//         res.json(bug);
//     })
// })