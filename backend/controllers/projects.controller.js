const Project = require('../models/project.model');

module.exports = {
    index: (req, res, next) => {
        Project.find(function(err, projects) {
            if (err) {
                next(err);
    
            }else {
                res.json(projects)
            }
        })
    
    },

    newProject: (req, res, next) => {
        let newProject = new Project(req.body);
        newProject.save()
            .then(project => {
                res.status(200).json({'Project' : 'Project added success' + project})
            })
        .catch(err => {
            next(err);
        })
    }
    
};