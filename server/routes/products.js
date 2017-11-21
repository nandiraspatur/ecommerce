const router = require('express').Router()
const productController = require('../controllers/products')

// customers route
router.get('/', productController.findAll)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.remove)

module.exports = router;
