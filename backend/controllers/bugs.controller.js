const Bug = require('../models/bug.model');

module.exports = {
    index: async(req, res,next) => {

        const bugs = await Bug.find({});
        res.status(200).json(bugs);
    
    },

    // newBug: async (req, res, next) => {
    
    //     let newBug = new Bug(req.body);
    //     let bug = await newBug.save()
    //     res.status(200).json({'Bug' : 'Bug added success' + bug})

    // },

    getBug: async (req, res, next) => {
        console.log('Req params' + JSON.stringify(req.params.id));
        const { id } = req.params;
        const bug = await Bug.findById(id);
        res.status(200).json(bug);
    },

    // Under the put route, will prompt user for all fields to be updated
    replaceBug: async (req, res, next) => {
        const { id } = req.params;
        const newBug = req.body;
        const result = await Bug.findByIdAndUpdate(id, newBug);
        console.log('Result ',result);
        res.status(200).json({sucess : true});
    },
    // Inder the patch route, will prompt user for only one field to update
    updateBug: async (req, res, next) => {
        const { id } = req.params;
        console.log("Req body ",JSON.stringify(req.body));
        const newBug = req.body;
        const result = await Bug.findByIdAndUpdate(id, newBug);
        res.status(200).json({success: true});
    },

    getBugAndProjects: async (req,res,next) => {
        const { id } = req.params;
        const bug = await Bug.findById(id).populate('project');
        
        
        console.log("Bug: " + bug.bugs);
        res.status(200).json(bug);
    },

    newBugProjects: async (req, res, next) => {
        const { id } = req.params;

        let newBug  = new Bug(req.body);
        
        
        console.log("Req Body", req.body);
        console.log('New bug', newBug);

        const bug = await Bug.findById(id).populate('project');
        console.log("New Bug bugs " + bug);
        // Assign bug as bug's bug
        console.log("Newbug bugs" + newBug.bugs);
        newBug.bugs = bug;

        await newBug.save();
        // Add bug to bugs array of bugs
        //console.log("Bugs " + bug.bugs);
        console.log("Bug bugs " + bug);
        bug.bugs.push(newBug);
        // Save the bug
        await bug.save();
        //console.log("After save Bug bugs ",bug);
        res.status(201).json(newBug);
    }
};