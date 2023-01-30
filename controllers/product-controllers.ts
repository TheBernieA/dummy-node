import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"
import { validationResult } from 'express-validator'
import { HttpError } from '../models/http-error';


const prisma = new PrismaClient()

const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: { products: true }
    })
    res.json(users)
}

const getProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany()
    res.json(products)
}

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    // const error = validationResult(req)
    // if (!error.isEmpty()) {
    //     return next(new HttpError('Please insert valid details', 422))
    // }

    const { productList } = req.body
    const products = await prisma.product.createMany({
        data: productList
    })
    res.json(products)
}

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const image = req.file?.filename
    const imageUpload = await prisma.product.update({
        where: {
            id: +id
        },
        data: {
            image: image
        }
    })

    res.status(201).json({ message: 'Image successfully uploaded' })
}


const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId
    const { name, description } = req.body
    const updateProduct = await prisma.product.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name,
            description: description
        }
    })
    res.json(updateProduct)
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deletedProduct = await prisma.product.delete({
        where: {
            id: +id
        }
    })
    res.json(deletedProduct)
}

export { getUsers, getProducts, createProduct, uploadImage, updateProduct, deleteProduct }