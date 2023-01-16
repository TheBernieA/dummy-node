import express from 'express'
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/users-controllers'
import { check } from 'express-validator'


export const router = express.Router()


router.get('/', getUsers)

router.post('/',
    [
        check('username').not().isEmpty(),
        check('password').isLength({ min: 6 })
    ]
    , createUser)

router.put('/', updateUser)

router.delete('/:id', deleteUser)