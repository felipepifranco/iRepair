import cookieParser from 'cookie-parser'
import express from 'express';
import cors from 'cors'

import { clientRoutes } from '../domains/clients/clients.routes';
import { ordensRoutes } from '../domains/service-orders/service-orders.routes';
import { authRoutes } from '../domains/auth/auth.routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  // origem exata do seu front-end
  credentials: true,                // OBRIGATÓRIO para enviar/receber cookies
}))

app.use(express.json()); 

app.use(cookieParser())

app.use('/auth', authRoutes)

app.use('/clients', clientRoutes);
app.use('/service-orders', ordensRoutes);

export {app}