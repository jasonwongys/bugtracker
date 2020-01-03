const Bug = require('../models/bug.model');

module.exports = {
    index: async(req, res,next) => {

        const bugs = await Bug.find({});
        res.status(200).json(bugs);
    
    }
};