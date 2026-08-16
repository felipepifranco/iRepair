import {type ServiceOrder, type  CreateServiceOrder} from "@shared/types"
import { DoesntExist } from "../../utils/DoesntExist.js";

import { prisma } from "../../config/prismaClient"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ServiceOrderStatus } from "@generated/prisma";


class ServiceOrderService {
  // criar service order
  async create({ client_id, device, issue , status}: CreateServiceOrder ) : Promise<ServiceOrder> {
    
    if (!client_id) {
      throw new Error("ID do cliente é obrigatório");
    } else if (!device) {
      throw new Error("Dispositivo é obrigatório");
    } else if (!issue) {
      throw new Error("Problema é obrigatório");
    }

    const newServiceOrder = await prisma.serviceOrder.create({
      data: {
        status,
        client_id,
        device,
        issue,
      }
    });
    
    return newServiceOrder;
  }
  
  // listar ordens de serviço
  async list(status? : ServiceOrderStatus | undefined) : Promise<ServiceOrder[]>{
    const orders = await prisma.serviceOrder.findMany();
    if (status !== undefined) {
      return orders.filter((serviceOrder : ServiceOrder)=> serviceOrder.status === status);
    }
    return orders;
  }



  // método para buscar um service específica pelo ID
  async search(id_ :number) : Promise<ServiceOrder>{
    const sOrder = await prisma.serviceOrder.findUnique({ where: { id: id_ } });

    if(sOrder === null){
      throw new DoesntExist("Tarefa não encontrada!");
    } else{
      return sOrder
    }
  }

  // método para editar um service order
  async editServiceOrder(id_ : number, client_id? : number, device?: string, issue?: string, status?: ServiceOrderStatus){
    // valores são opcionais pois permite definir oq quer mudar
    try{
      if(client_id){
        await prisma.serviceOrder.update({ where: { id: id_ }, data: { client_id: client_id } })
      }

      if(device){
        await prisma.serviceOrder.update({ where: { id: id_ }, data: { device: device } })
      }
      
      if(issue){
        await prisma.serviceOrder.update({ where: { id: id_ }, data: { issue: issue } })
      }


      if(status){
        await prisma.serviceOrder.update({ where: { id: id_ }, data: { status: status } })
      }

      return this.search(id_);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new DoesntExist('Tarefa não encontrada.');
      }
      
      throw error; 
    }
  }

  // método para deletar um service order
  async deleteServiceOrder(id_:number){    
    try {
      await prisma.serviceOrder.delete({ where: { id: id_ } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new DoesntExist('Tarefa não encontrada.');
      }
      throw error; 
    }
  }
}

export { ServiceOrderService };