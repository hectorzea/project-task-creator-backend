const Task = require('../models/Task');
const Project = require('../models/Projects');
const {validationResult} = require('express-validator');
exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const {project} = req.body;
        const projectExists = await Project.findById(project);
        if (!projectExists)
            return res.status(404).json({msg: 'Project not found'});
        if (projectExists.created_by.toString() !== req.user.id)
            return res.status(401).json({msg: 'Not authorized'});

        const task = new Task(req.body);
        await task.save();
        await res.json({task})
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server Error');
    }
};

exports.getTasks = async (req, res) => {
    try {
        const {project} = req.query;
        const projectExists = await Project.findById(project);
        if (!projectExists)
            return res.status(404).json({msg: 'Project not found'});
        if (projectExists.created_by.toString() !== req.user.id)
            return res.status(401).json({msg: 'Not authorized'});

        const tasks = await Task.find({project});
        await res.json({tasks});

    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

exports.updateTask = async (req, res) => {
    try {
        const {project, name, state} = req.body;
        let task = await Task.findById(req.params.id);

        if (!task)
            return res.status(404).json({msg: 'Inexistent Task'});

        const projectExists = await Project.findById(project);
        if (projectExists.created_by.toString() !== req.user.id)
            return res.status(401).json({msg: 'Not authorized'});

        const newTask = {};
        newTask.name = name;
        newTask.state = state;

        task = await Task.findOneAndUpdate(req.params.id, newTask, {new: true});
        await res.json({task})


    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const {project} = req.query;
        let task = await Task.findById(req.params.id);

        if (!task)
            return res.status(404).json({msg: 'Inexistent Task'});

        const projectExists = await Project.findById(project);
        if (projectExists.created_by.toString() !== req.user.id)
            return res.status(401).json({msg: 'Not authorized'});

        await Task.findOneAndRemove(req.params.id);
        await res.json({msg: 'Task Deleted'})


    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
};