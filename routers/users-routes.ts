import express from 'express'
import { createUser, getUsers } from '../controllers/users-controllers'
import { check } from 'express-validator'


export const router = express.Router()


router.get('/', getUsers)

router.post('/',
    [
        check('username').not().isEmpty(),
        check('password').isLength({ min: 6 })
    ]
    , createUser)