const express = require('express')
const Product = require(('../models/task.model.js'));
const router = express.Router();
const {getTasks, getTask, createTask, updateTask, deleteTask} = require('../controllers/task.controller.js')

router.get('/', getTasks);

router.get('/:id', getTask);

router.post('/', createTask);

// update a product
router.put("/:id", updateTask);

// delete a product
router.delete("/:id", deleteTask);

module.exports = router;