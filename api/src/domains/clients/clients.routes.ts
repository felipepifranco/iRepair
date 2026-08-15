// src/domains/ordens/ordens.routes.ts
import { Router } from 'express'
// import { authMiddleware } from '../../middlewares/authMiddleware'
import { ClientController } from './clients.controller'

const clientRoutes = Router()
const clientController = new ClientController()

// TODO: Todas as rotas deste router exigem autenticação
//clientRoutes.use(authMiddleware)

clientRoutes.get('/',       clientController.list.bind(clientController))
clientRoutes.get('/:id',    clientController.search.bind(clientController))
clientRoutes.post('/',      clientController.create.bind(clientController))
clientRoutes.put('/:id',    clientController.editClient.bind(clientController))
clientRoutes.delete('/:id', clientController.delete.bind(clientController))

export { clientRoutes }