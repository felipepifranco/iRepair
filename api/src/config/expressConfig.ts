import cookieParser from 'cookie-parser'
import express from 'express';

const app = express();

app.use(express.json()); 

app.use(cookieParser())

app.use('/auth', authRoutes)

export {app}