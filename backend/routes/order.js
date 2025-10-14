const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.placeOrder);
router.get('/:User_ID', orderController.viewOrders);
router.put('/:Order_ID/status', orderController.updateOrderStatus);

module.exports = router;
