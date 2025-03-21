const express = require('express');
const {
  authAdmin,
  registerAdmin,
  addJob,
  updateJob,
  deleteJob,
  getJobs,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin Auth & Register Routes
router.post('/login', authAdmin);
router.post('/register', registerAdmin);

// Job Management Routes (Protected)
router.post('/jobs', protect, addJob);
router.put('/jobs/:id', protect, updateJob);
router.delete('/jobs/:id', protect, deleteJob);
router.get('/jobs', protect, getJobs);

module.exports = router;
