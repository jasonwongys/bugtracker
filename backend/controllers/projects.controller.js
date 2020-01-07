const Project = require('../models/project.model');
const Bug = require('../models/bug.model');

module.exports = {
    index: async(req, res,next) => {

        const projects = await Project.find({});
        res.status(200).json(projects);
    
    },

    
    newProject: async (req, res, next) => {
    
        let newProject = new Project(req.body);
        let project = await newProject.save()
        res.status(200).json({'Project' : 'Project added success' + project})

    },

    getProject: async (req, res, next) => {
        console.log('Req params' + JSON.stringify(req.params.id));
        const { id } = req.params;
        const project = await Project.findById(id);
        res.status(200).json(project);
    },

    // Under the put route, will prompt user for all fields to be updated
    replaceProject: async (req, res, next) => {
        const { id } = req.params;
        const newProject = req.body;
        const result = await Project.findByIdAndUpdate(id, newProject);
        console.log('Result ',result);
        res.status(200).json({sucess : true});
    },
    // Inder the patch route, will prompt user for only one field to update
    updateProject: async (req, res, next) => {
        const { id } = req.params;
        console.log("Req body ",JSON.stringify(req.body));
        const newProject = req.body;
        const result = await Project.findByIdAndUpdate(id, newProject);
        res.status(200).json({success: true});
    },

    getProjectBugs: async (req,res,next) => {
        const { id } = req.params;
        const project = await Project.findById(id).populate('Bug');
        
        
        console.log("Project: " + project.bugs);
        res.status(200).json(project);
    },

    newProjectBugs: async (req, res, next) => {
        const { id } = req.params;

        let newBug  = new Bug(req.body);
        
        
        console.log("Req Body", req.body);
        console.log('New bug', newBug);

        const project = await Project.findById(id).populate('Bug');
        console.log("New Bug projects " + project);
        // Assign project as bug's project
        console.log("Newbug projects" + newBug.projects);
        newBug.projects = project;

        await newBug.save();
        // Add bug to projects array of bugs
        //console.log("Bugs " + project.bugs);
        console.log("Project bugs " + project);
        project.bugs.push(newBug);
        // Save the project
        await project.save();
        //console.log("After save Project bugs ",project);
        res.status(201).json(newBug);
    }
    
};