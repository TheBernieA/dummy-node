import express, { NextFunction, Request, Response } from 'express';
import { router as usersRouter } from './routers/users-routes';
import { HttpError } from './models/http-error';



const app = express()


app.use(express.json())

app.use('/api/users/', usersRouter)

app.use(() => {
    throw new HttpError('Could not find route', 404)
})


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'Unknown request'})
})

const port = 3000
app.listen(port, () => {
    console.log('server running on port', port);
})
