import express, { NextFunction, Request, Response } from 'express';
import { router as usersRoute } from './routers/users-routes';
import { HttpError } from './models/http-error';
import multer, { FileFilterCallback } from 'multer'
import { randomUUID } from 'crypto';

//MVC MODEL VIEW CONTROLLER


const app = express()

app.use(express.json())



const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        callback(null, `${randomUUID()}-${file.originalname}`)
    },
})
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.use(multer({ storage: fileStorage }).single("image"))

app.use('/api/users/', usersRoute)

app.use(() => {
    throw new HttpError("This route was not found", 404);
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || "Unknown error occured" })
})

const port = 3000

app.listen(port, () => {
    console.log('server running on port', port);
})
