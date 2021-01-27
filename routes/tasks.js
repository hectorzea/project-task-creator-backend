const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const {check} = require('express-validator');

router.post('/', AuthMiddleware, [check('name', 'The name of the task is mandatory').not().isEmpty(),
    check('project', 'The project is mandatory').not().isEmpty()], TaskController.createTask);
router.get('/', AuthMiddleware, TaskController.getTasks);
router.put('/:id', AuthMiddleware, TaskController.updateTask);
router.delete('/:id', AuthMiddleware, TaskController.deleteTask);

module.exports = router;