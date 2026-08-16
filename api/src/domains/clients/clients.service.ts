import type { client } from "@generated/prisma";
import { Prisma } from "@generated/prisma";
type CreateClient = Prisma.clientUncheckedCreateInput; 
import { DoesntExist } from "../../utils/DoesntExist.js";

import { prisma } from "../../config/prismaClient"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";



class ClientService {
  // criar novo cliente
  async create({ name, phone, email}: CreateClient) : Promise<client> {
    
    if (!name) {
      throw new Error("nome do cliente é obrigatório");
    } else if (!phone) {
      throw new Error("telefone é obrigatório");
    } else if (!email) {
      throw new Error("email é obrigatório");
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        phone,
        email
      }
    });
    
    return newClient;
  }
  
  // listar clientes
  async list() : Promise<client[]>{
    const clients = await prisma.client.findMany();
    
    return clients;
  }

  // método para buscar um cliente específica pelo ID
  async search(id_ :number) : Promise<client>{
    const client_ = await prisma.client.findUnique({ where: { id: id_ } });

    if(client_ === null){
      throw new DoesntExist("Tarefa não encontrada!");
    } else{
      return client_
    }
  }

  // método para editar um cliente
  async editClient(id_ : number, name? : string, phone?: string, email?: string){
    // valores são opcionais pois permite definir oq quer mudar
    try{
      if(name){
        await prisma.client.update({ where: { id: id_ }, data: { name: name } })
      }

      if(phone){
        await prisma.client.update({ where: { id: id_ }, data: { phone: phone } })
      }

      if(email){
        await prisma.client.update({ where: { id: id_ }, data: { email: email } })
      }
      return this.search(id_);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new DoesntExist('Tarefa não encontrada.');
      }
      
      throw error; 
    }
  }

  // método para deletar um cliente
  async deleteClient(id_:number){    
    try {
      await prisma.client.delete({ where: { id: id_ } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new DoesntExist('Tarefa não encontrada.');
      }
      throw error; 
    }
  }
}

export { ClientService };