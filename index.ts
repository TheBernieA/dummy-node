import express, { NextFunction, Request, Response } from 'express';
import { router as usersRoute } from './routers/users-routes';
import { HttpError } from './models/http-error';
import multer, { FileFilterCallback } from 'multer'
import { randomUUID } from 'crypto';

//MVC MODEL VIEW CONTROLLER


const app = express()

app.use(express.json())

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, `${randomUUID()}-${file.originalname}`)
    },
})


const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))


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
