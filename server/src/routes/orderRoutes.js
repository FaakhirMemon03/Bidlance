const express = require('express');
const router = express.Router();
const { createOrder, approveOrder, deliverOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/', getMyOrders);
router.post('/', createOrder);
router.put('/:id/deliver', deliverOrder);
router.put('/:id/approve', approveOrder);

module.exports = router;
