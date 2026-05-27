const express = require('express');
const router = express.Router();
const { getWallet, getTransactions, deposit, withdraw } = require('../controllers/walletController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // all wallet routes require auth

router.get('/', getWallet);
router.get('/transactions', getTransactions);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);

module.exports = router;
