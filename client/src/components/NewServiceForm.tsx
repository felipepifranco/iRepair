import { useState } from "react";
import { type CreateServiceOrder } from "../../../shared/types";
import { createServiceOrder } from "../services/serviceOrderService";
import { ClientSelectDropdown } from "./DropBox";

function NewServiceForm({fetchServices} : {fetchServices : () => void}) {
  //inputs
  const [name, setName] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [defeito, setDefeito] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);


  //envio formulario
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim() !== "" && aparelho.trim() !== "" && defeito.trim() !== "") {
      // PEGAR UM CLIENTE
      const newService: CreateServiceOrder = {
        client_id: selectedClientId ?? 2,
        device: aparelho,
        issue: defeito,
        status: 'open',
      };
      
      try {
        await createServiceOrder(newService);
        fetchServices()

        setName("");
        setAparelho("");
        setDefeito("");
        setSelectedClientId(null);

      } catch (e) {
        console.error(e);
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
            <ClientSelectDropdown
              name={name}
              setName={setName}
              onSelectClient={setSelectedClientId}
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

        <input 
          type="submit" 
          value="Salvar" 
          className="bg-sky-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-sky-700"
        />
      </form>
    </div>
  );
};

export default NewServiceForm;