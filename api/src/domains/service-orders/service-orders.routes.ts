// src/domains/ordens/ordens.routes.ts
import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { ServiceOrderController } from './service-orders.controller'

const ordensRoutes = Router()
const ordensController = new ServiceOrderController()

// TODO: Todas as rotas deste router exigem autenticação
//ordensRoutes.use(authMiddleware)

ordensRoutes.get('/',       ordensController.list.bind(ordensController))
ordensRoutes.get('/:id',    ordensController.search.bind(ordensController))
ordensRoutes.post('/',      ordensController.create.bind(ordensController))
ordensRoutes.put('/:id',    ordensController.editServiceOrder.bind(ordensController))
ordensRoutes.delete('/:id', ordensController.delete.bind(ordensController))

export { ordensRoutes }