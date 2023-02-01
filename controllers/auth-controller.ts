import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import { HttpError } from '../models/http-error';
import jwt from 'jsonwebtoken'
import '../helpers/passport'

const prisma = new PrismaClient()
const { SECRET = '' } = process.env

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const createUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    })

    res.json(createUser)
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { username }
        const accessToken = await jwt.sign(payload, SECRET)
        user.token = accessToken
        return res.json({ message: 'user logged', user })
    } else {
        next(new HttpError('Unauthorized Exception', 401))
    }
}


const logout = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user
    const userlogout = await prisma.user.update({
        where: {
            id: user?.id
        },
        data: {
            token: null
        }
    })
    res.json({ message: 'User logged out', userlogout })
}


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const deleteUser = await prisma.user.delete({
        where: {
            id: +id
        }
    })
    res.json({ message: 'User deleted' })
}

export { signup, deleteUser, login, logout }