const router = require('express').Router()
const ordersController = require('../controllers/OrdersController')

router.get('/', ordersController.index)
router.post('/addCart', ordersController.addCart)
router.get('/cart', ordersController.showCart)

router.put('/updateCart', ordersController.updateCart) 

//router.post('/release', ordersController.releaseOrder)
//router.put('/cancel/:id', ordersController.cancelOrder)

//router.get('/payment', ordersController.paymentProcess)

module.exports = router

