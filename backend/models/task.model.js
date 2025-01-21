const mongoose = require('mongoose');

const PRIORITY = ['Low', 'Medium', 'High'];

const TaskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter task name"]
        },
        userId: {
            type: String,
            required: [true, "User ID is required"]
        },
        priority: {
            type: String,
            required: true,
            enum: PRIORITY,
            default: 'Medium',
            required: true
        },

        completed: {
            type: Boolean,
            required: true,
            default: false
        },

        dueDate: {
            type: Date,
            required: false
          },
    },
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task