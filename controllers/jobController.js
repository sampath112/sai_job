const Job = require('../models/Job');

// Get All Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Add Job
const addJob = async (req, res) => {
  const { role, description, salary, skills, experience, location } = req.body;

  try {
    const job = new Job({
      role,
      description,
      salary,
      skills,
      experience,
      location,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update Job
const updateJob = async (req, res) => {
  const { role, description, salary, skills, experience, location } = req.body;

  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.role = role || job.role;
    job.description = description || job.description;
    job.salary = salary || job.salary;
    job.skills = skills || job.skills;
    job.experience = experience || job.experience;
    job.location = location || job.location;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { getJobs, addJob, updateJob, deleteJob };
