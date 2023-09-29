import { PrismaClient } from "@prisma/client";
import passport from "passport";
import passportJWT from 'passport-jwt'

const prisma = new PrismaClient()
const { SECRET } = process.env

passport.use(
    new passportJWT.Strategy({
        secretOrKey: SECRET,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async (payload, done) => {
            const user = await prisma.user.findFirst({
                where: {
                    id: payload.id
                }
            })
            try {
                return user ? done(null, user) : done(new Error('user not found'))
            } catch (error) {
                done(error)
            }
        }

    )
)