const mongoose = require('mongoose');

// Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true }, // e.g., full-time, part-time, remote
  salaryRange: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
