const express = require('express');
const router = express.Router();
const { placeBid, getProjectBids } = require('../controllers/bidController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/:projectId', getProjectBids);
router.post('/', protect, placeBid);

module.exports = router;
