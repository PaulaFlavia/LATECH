const router = require('express').Router()
const ordersController = require('../controllers/OrdersController')

router.get('/cart', ordersController.showCart)
router.post('/addCart', ordersController.addCart)
router.get('/payment', ordersController.paymentProcess)
router.post('/release', ordersController.releaseOrder)
router.post('/delete/:id', ordersController.deleteProduct)

module.exports = router

