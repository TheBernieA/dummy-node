import express from 'express'
import { createProduct, deleteProduct, getProducts, getUsers, updateProduct, uploadImage } from '../controllers/product-controllers'
import { check } from 'express-validator'

export const router = express.Router()

router.get('/users', getUsers)
router.get('/', getProducts)

router.post('/',
    [
        check('name').not().isEmpty(),
        check('description').isLength({ min: 6 }),
    ]
    , createProduct)

router.post('/:id/image', uploadImage)

router.put('/', updateProduct)

router.delete('/:id', deleteProduct)
