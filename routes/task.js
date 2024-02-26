const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const Task = require('../models/taskModel');

// Route to create a new task
router.post('/tasks', authenticateUser, async (req, res) => {
    try {
        const { title, priority, checklist, dueDate } = req.body;
        const createdBy = req.user.userId; // Assuming userId is stored in req.user
        const task = new Task({ title, priority, checklist, dueDate, createdBy });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

module.exports = router;