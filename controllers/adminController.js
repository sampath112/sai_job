const Admin = require('../models/Admin');
const Job = require('../models/Job');
const generateToken = require('../utils/generateToken');

// ----------------- Admin Auth Controllers -----------------

// @desc Auth admin & get token
// @route POST /api/admin/login
const authAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc Register new admin
// @route POST /api/admin/register
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400).json({ message: 'Admin already exists' });
    return;
  }

  const admin = await Admin.create({ name, email, password });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
};

// ----------------- Job CRUD Controllers -----------------

// @desc Add a new job
// @route POST /api/admin/jobs
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

// @desc Get all jobs
// @route GET /api/admin/jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// @desc Update a job
// @route PUT /api/admin/jobs/:id
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

// @desc Delete a job
// @route DELETE /api/admin/jobs/:id
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

module.exports = {
  authAdmin,
  registerAdmin,
  addJob,
  getJobs,
  updateJob,
  deleteJob,
};
