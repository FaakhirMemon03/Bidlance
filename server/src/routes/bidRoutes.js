const express = require('express');
const router = express.Router();
const { placeBid, getProjectBids, getSellerBids, respondToBid } = require('../controllers/bidController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/seller/active', protect, getSellerBids);
router.get('/:projectId', getProjectBids);
router.post('/', protect, placeBid);
router.put('/:id/respond', protect, respondToBid);

module.exports = router;
