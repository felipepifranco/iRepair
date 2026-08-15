import { type Request, type Response } from 'express';

import { ServiceOrderService } from './service-orders.service.js';
import { DoesntExist } from '../../utils/DoesntExist.js';
import { ServiceOrderStatus } from "@generated/prisma";

// Uma classe que "sabe" gerenciar requisições de Tarefas
class ServiceOrderController {
  
  // Um método para gerenciar a rota de CRIAR
  async create(req: Request, res: Response) {
    try {
      // 1. Pega os dados da requisição (trabalho de Gerente)
      const { client_id, device, issue } = req.body; // desestruturação
      
      // 2. Chama o "Trabalhador" (Service) para fazer a lógica
      const service = new ServiceOrderService();
      const status : ServiceOrderStatus = "open";
      const sOrder = await service.create({ client_id, device, issue, status});
      
      // 3. Devolve a resposta (trabalho de Gerente)
      return res.status(201).json(sOrder);
     } catch (error) {
      // 4. Se o "Trabalhador" der um erro (ex: "Nome é obrigatório"),
      // o Gerente avisa o Cliente.
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
  
  // listar ordens de serviço
  async list(req: Request, res: Response) {
    const service = new ServiceOrderService();
    try{
      // filtro
      let statusFilter = req.query.status;

      if(statusFilter !== "open" && statusFilter !== "in_progress" && statusFilter != "done"){
        statusFilter = undefined;
      }
      
      // listagem
      const sOrders = await service.list(statusFilter);
      return res.status(200).json(sOrders);

    } catch(error){
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  // buscar ordem especifica
  async search(req: Request, res: Response){
    try{
      const id = Number(req.params.id);
      const service = new ServiceOrderService();
      const sOrder = await service.search(id);
      return res.status(200).json(sOrder);

    } catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de ordem de serviço inexistente" });
      } else if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  // atualizar uma ordem de serviço
  async editServiceOrder(req: Request, res: Response){
    try{
      const id = Number(req.params.id);
      const {client_id, device, issue, status} = req.body;

      const service = new ServiceOrderService();
      const sOrder = await service.editServiceOrder(id,  client_id, device, issue, status);
      
      return res.status(200).json(sOrder);
      
    }catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de ordem de serviço inexistente" });
      } else if (error instanceof TypeError){
        return res.status(400).json({erro: error.message})
      } else {
      return res.status(500).json({ erro: "Erro interno do servidor" });
      }
    }
  }

  async delete(req: Request, res: Response){
    try{
      const id = Number(req.params.id);
      const service = new ServiceOrderService();
      
      await service.deleteServiceOrder(id);
      return res.status(204).send();

    } catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de ordem de serviço inexistente" });
      } else if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
}

export { ServiceOrderController };