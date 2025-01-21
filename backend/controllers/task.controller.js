const Task = require('../models/task.model');

const getTasks = async (req, res) => {
  try {
      console.log('User ID from Clerk:', req.auth.userId); // Debug log
      const userId = req.auth.userId; 
      const tasks = await Task.find({ userId });
      res.status(200).json(tasks);
  } catch (error) {
      console.error('Task fetch error:', error);
      res.status(500).json({
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
  }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);  
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createTask = async (req, res) => {
  try {
      if (!req.body.name) {
          return res.status(400).json({ message: "Name field is required" });
      }

      const task = await Task.create({
          ...req.body,
          userId: req.auth.userId 
      });
      res.status(201).json(task);
  } catch (error) {
      if (error.name === 'ValidationError') {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
  }
}

const updateTask = async (req, res) => {
  try {
      const { id } = req.params;
      const userId = req.auth.userId;
      
      const task = await Task.findOneAndUpdate(
          { _id: id, userId }, 
          req.body,
          { new: true }
      );

      if (!task) {
          return res.status(404).json({ message: "Task not found or unauthorized" });
      }

      res.status(200).json(task);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
      const { id } = req.params;
      const userId = req.auth.userId;
      
      const task = await Task.findOneAndDelete({ _id: id, userId });

      if (!task) {
          return res.status(404).json({ message: "Task not found or unauthorized" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};