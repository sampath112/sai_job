const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    role: { type: String, required: true, index: true },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    skills: { type: [String], required: true, index: true },
    experience: { type: String, required: true },
    location: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
