import express from 'express'
import { signup, deleteUser, login } from '../controllers/auth-controller'


export const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.delete('/:id', deleteUser)