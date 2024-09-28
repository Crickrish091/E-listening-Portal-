const express = require('express');
const Job = require('../models/Job');
const passport = require('passport');
const router = express.Router();

// Create a job listing (Employer only)
router.post('/createJob', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ msg: 'Unauthorized' });
  }
  const { title, description, location, jobType, salaryRange } = req.body;
  try {
    const job = new Job({
      title,
      description,
      location,
      jobType,
      salaryRange,
      employer: req.user.id
    });
    await job.save();
    req.user.profile.employerProfile.jobListings.push(job.id);
    await req.user.save();
    res.json(job);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Job search with filters (job seekers)
router.get('/search', async (req, res) => {
  const { jobType, location } = req.query;
  try {
    const jobs = await Job.find({
      jobType: jobType || { $exists: true },
      location: location || { $exists: true }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Apply for a job (Job seeker only)
router.post('/apply/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.role !== 'job-seeker') {
    return res.status(403).json({ msg: 'Unauthorized' });
  }
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    job.applicants.push(req.user.id);
    await job.save();

    req.user.profile.jobSeekerProfile.appliedJobs.push(job.id);
    await req.user.save();
    res.json({ msg: 'Application successful' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
