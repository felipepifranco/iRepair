import { type Request, type Response } from 'express';

import { ClientService } from './clients.service.js';
import { DoesntExist } from '../../utils/DoesntExist.js';


class ClientController {
  async create(req: Request, res: Response) {
    try {
      const { name, phone, email } = req.body; // desestruturação
      
  
      const service = new ClientService();
      const client_ = await service.create({name, phone, email});
      
      return res.status(201).json(client_);
     } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
  
  // listar clientes
  async list(req: Request, res: Response) {
    const service = new ClientService();
    try{
      const clients = await service.list();
      return res.status(200).json(clients);

    } catch(error){
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  // buscar cliente especifico
  async search(req: Request, res: Response){
    try{
      const id = Number(req.params.id);
      const service = new ClientService();
      const client_ = await service.search(id);
      return res.status(200).json(client_);

    } catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de cliente inexistente" });
      } else if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  // atualizar um cliente
  async editClient(req: Request, res: Response){
    try{
      const id = Number(req.params.id);
      const {name, phone,  email} = req.body;

      const service = new ClientService();
      const client_ = await service.editClient(id, name, phone,  email);
      
      return res.status(200).json(client_);
      
    }catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de cliente inexistente" });
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
      const service = new ClientService();
      
      await service.deleteClient(id);
      return res.status(204).send();

    } catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de cliente inexistente" });
      } else if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
}

export { ClientController };