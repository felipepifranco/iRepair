import { useState, useEffect } from "react";
import { ServiceCard } from "./ServiceCard"; 
import { type Client, type ServiceOrder, type CreateServiceOrderData } from '../types';
import { createServiceOrder } from "../services/serviceOrderService";

import { getAllServiceOrders } from "../services/serviceOrderService";


function AllServicesList(){
  const [services, setServices] = useState<ServiceOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllServiceOrders();
        setServices(data);
      } catch (e) {
        setError('Não foi possível carregar os serviços.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts()
  }, []);
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  

  return(
    <div className="flex flex-col gap-4 mt-4">
      {services.length === 0 && 
      <p className="text-center text-stone-400">Nenhum serviço registrado.</p>}
      
      {services.map((service : ServiceOrder) => (
        <ServiceCard 
          key={service.id} 
          id={service.id}
          client_id={service.client_id}
          device={service.device}
          issue={service.issue}
          status={service.status}
          created_at={service.created_at}
        />
      ))}
    </div>
  )
}

const NewServiceForm = () => {
  //inputs
  const [nome, setNome] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [defeito, setDefeito] = useState("");
  const [dataChegouStr, setDataChegouStr] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmiting, setIsSubmitting] = useState(false);

  //envio formulario
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nome.trim() !== "" && aparelho.trim() !== "" && defeito.trim() !== "") {
      // PEGAR UM CLIENTE

      const newService: CreateServiceOrderData = {
        clientId: 1,
        device: aparelho,
        issue: defeito,
        status: 'open',
      };
      
      try {
        setIsSubmitting(true);
        setError(null);
        await createServiceOrder(newService);

        console.log(`carregou`)

        setNome("");
        setAparelho("");
        setDefeito("");
        setDataChegouStr("");

      } catch (e) {
        setError('Não foi possível registrar o serviço.');
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
      

    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="self-center w-3xl flex flex-col border-solid border border-stone-200 rounded-sm py-4 gap-4 bg-zinc-800 px-6">
        <p className="font-bold text-sky-600 text-xl px-1">Novo Serviço</p>
        
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2 items-center">
            <label className="text-sky-600">Cliente:</label>
            <input 
              type="text" 
              // TODO: pegar o objeto (buscar na API em vez de pegar o nome direto)
              // se o cliente não existe, deve criar um novo
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="nome do cliente" 
              className="p-1 rounded bg-zinc-700 text-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sky-600">Aparelho:</label>
            <input 
              type="text" 
              value={aparelho} 
              onChange={(e) => setAparelho(e.target.value)} 
              placeholder="aparelho do cliente" 
              className="p-1 rounded bg-zinc-700 text-white"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sky-600">Defeito:</label>
          <input 
            type="text" 
            value={defeito} 
            onChange={(e) => setDefeito(e.target.value)} 
            placeholder="descrição do defeito" 
            className="p-1 rounded bg-zinc-700 text-white w-full"
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex gap-2 items-center">
            <label className="text-sky-600 text-sm">Data chegada:</label>
            <input 
              type="date" 
              value={dataChegouStr} 
              onChange={(e) => setDataChegouStr(e.target.value)} 
              className="p-1 rounded bg-zinc-700 text-white text-sm"
            />
          </div>
        </div>

        <input 
          type="submit" 
          value="Salvar" 
          className="bg-sky-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-sky-700"
        />
      </form>

      {/** renderização dos serviços usando map */}
      <AllServicesList />
    </div>
  );
};

export default NewServiceForm;