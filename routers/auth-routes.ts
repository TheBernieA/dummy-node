import express from 'express'
import { deleteUser, login, signup } from '../controllers/auth-controller'


export const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.delete('/:id', deleteUser)