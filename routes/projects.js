const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const {check} = require('express-validator');
router.post('/',
    AuthMiddleware,
    [
        check('name', 'The name of the project is mandatory').not().isEmpty()
    ],
    ProjectController.createProject);
router.get('/', AuthMiddleware, ProjectController.getProjects);
router.put('/:id', AuthMiddleware, [check('name', 'The name of the project is mandatory').not().isEmpty()], ProjectController.updateProject);
router.delete('/:id', AuthMiddleware, [check('name', 'The name of the project is mandatory').not().isEmpty()], ProjectController.deleteProject);

module.exports = router;