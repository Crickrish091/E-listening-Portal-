const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Add new course (educator only)
router.post('/add', async (req, res) => {
    const { title, description, educatorId } = req.body;
    try {
        const course = new Course({
            title,
            description,
            educator: educatorId
        });
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('educator', ['name']);
        res.json(courses);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
