import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"
import { validationResult } from 'express-validator'
import { HttpError } from '../models/http-error';


const prisma = new PrismaClient()

const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    res.json(users)
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return next(new HttpError('Please insert valid details', 422))
    }

    const { username, password } = req.body
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
    res.json(user)
}

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    const image = req.file?.filename
    const imageUpload = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            image: image
        }
    })

    res.status(201).json({ message: 'Image successfully uploaded' })
}


const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId
    const { username } = req.body
    const updateUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            username: username
        }
    })
    res.json(updateUser)
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    // const { id } = req.body
    const deletedUser = await prisma.user.delete({
        where: {
            id: +id
        }
    })
    res.json(deletedUser)
}

export { getUsers, createUser, uploadImage, updateUser, deleteUser }