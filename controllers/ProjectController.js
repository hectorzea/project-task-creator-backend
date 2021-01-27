const Project = require('../models/Projects');
const {validationResult} = require('express-validator');
exports.createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const project = new Project(req.body);
        project.created_by = req.user.id;
        await project.save();
        await res.json(project);
    } catch (e) {
        console.log(e);
        res.status(500).send('An error has ocurred');
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({created_by: req.user.id});
        await res.json(projects);
    } catch (e) {

    }
};

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const name = req.body.name;
    const newProject = {};
    if (name) {
        newProject.name = name;
    }
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({msg: 'Project not found'})
        }
        if (project.created_by.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        project = await Project.findByIdAndUpdate(req.params.id, {'$set': newProject}, {new: true});
        await res.json({project});
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({msg: 'Project not found'})
        }
        if (project.created_by.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }
        await Project.findOneAndRemove(req.params.id);
        await res.json({msg: 'Project deleted'});
    } catch (e){
        console.log(e);
        res.status(500).send('Internal server error');
    }

};