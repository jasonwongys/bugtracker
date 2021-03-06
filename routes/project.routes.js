//const projectRoute = require('express').Router();
let Project = require('../models/project.model');
const projectRoute = require('express-promise-router')();

let ProjectsController = require('../controllers/projects.controller');

projectRoute.route('/')
    .get(ProjectsController.index)
    .post(ProjectsController.newProject);


projectRoute.route('/:id')
    .get(ProjectsController.getProject)
    .put(ProjectsController.replaceProject)
    .patch(ProjectsController.updateProject);

    //get alll bugs related to the project
projectRoute.route('/bugs/:id')
    .get(ProjectsController.getProjectBugs)
    .post(ProjectsController.newProjectBugs); // Add a bug to the project

//Delete a project
projectRoute.route('/:id').delete((req,res)=> {
    Project.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Project deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = projectRoute;

// Display all Projects
// projectRoute.route('/projectsList').get(function(req,res) {
//     Project.find(function(err, projects) {
//         if (err) {
//             console.log(err);

//         }else {
//             res.json(projects)
//         }
//     })
// })

//Create a Project
// projectRoute.route('/createProj').post(function(req,res) {
//     let project = new Project(req.body);
//     project.save()
//         .then(project => {
//             res.status(200).json({'Project' : 'Project added success'})
//         })
//         .catch(err => {
//             res.status(400).send('Adding Project failed '+ err);
//         });
// })

// Edit a project by ID
// projectRoute.route('/editProj/:id').post(function(req,res) {
//     Project.findById(req.params.id, function(err, project) {
//         if(!project) {
//             res.status(404).send('Data not found');
//         } else {
//             project.projectName = req.body.projectName;
//             project.description = req.body.description;
//             project.members = req.body.members;
//             project.dateCreated = Date.parse(req.body.dateCreated);
//             //project.completed = Date.parse(req.body.completed);

//             project.save().then(project => {
//                 res.json('Project updated');
//             })
//             .catch(err=> {
//                 res.status(400).send("Update not possible");
//             })
//         }
//     });
// })

// find a project by ID
// projectRoute.route('/:id').get(function(req,res) {
//     let id = req.params.id;
//     Project.findById(id, function(err, project) {
//         res.json(project);
//     })
// })


