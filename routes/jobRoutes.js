const express = require('express');
const router = express.Router();
const {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} = require('../controllers/adminController'); // Correct Controller

const { protect } = require('../middleware/authMiddleware');

// Public Route to Get All Jobs
router.get('/', getJobs);

// Protected Routes for Admin to Add/Edit/Delete Jobs
router.post('/', protect, addJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
