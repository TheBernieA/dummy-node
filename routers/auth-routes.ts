import express from 'express'
import { signup, deleteUser, login, logout } from '../controllers/auth-controller'
import { authorize } from '../helpers/authorize'
import '../helpers/passport'


export const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', authorize, logout)
router.delete('/:id', deleteUser)