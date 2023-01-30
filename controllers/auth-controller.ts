import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { HttpError } from "../models/http-error"
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()
const { SECRET = '' } = process.env

const signup = async (req: Request, res: Response) => {
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
        return res.json({ message: 'user logged', accessToken })
    } else {
        return next(new HttpError('unauthorized exception', 401))
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: +id
        }
    })
    res.json(deletedUser)
}

export { signup, deleteUser, login }