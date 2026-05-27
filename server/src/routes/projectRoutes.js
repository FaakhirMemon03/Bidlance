const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject, updateProject, deleteProject, getSellerProjects } = require('../controllers/projectController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getProjects);
router.get('/my-projects', protect, authorize('seller'), getSellerProjects);
router.get('/:id', getProject);
router.post('/', protect, authorize('seller', 'admin'), createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
