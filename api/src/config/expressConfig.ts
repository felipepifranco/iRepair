import cookieParser from 'cookie-parser'
import express from 'express';

import { clientRoutes } from '../domains/clients/clients.routes';
import { ordensRoutes } from '../domains/service-orders/service-orders.routes';

const app = express();

app.use(express.json()); 

// TODO: add auth
//app.use(cookieParser())
//app.use('/auth', authRoutes)

app.use('/clients', clientRoutes);
app.use('/service-orders', ordensRoutes);

export {app}