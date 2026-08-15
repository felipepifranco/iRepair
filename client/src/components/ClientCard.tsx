import type { Client } from "../../../shared/types";
import { deleteClient } from "../services/clientService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
  

export function ClientCard({id, name,phone, email, loadClients} : Client & { loadClients: () => void }){
  // TODO: fazer função de pegar nome do cliente

  async function handleDelete(){
    try{
      await deleteClient(id)
      console.log(`Cliente ${id} deletado com sucesso!`);
      loadClients()
    } catch(error){
      // TODO: criar um alert
      console.error("Erro ao deletar cliente:", error);
    }
  }

  return (
    <section className="self-center w-3xl flex justify-between border-solid border border-stone-500 rounded-sm py-4 gap-1 ">
      <div className="flex flex-col">
        <div className="flex justify-between px-5 items-center">
          <div className="flex gap-4 items-center">
            <h2 className="font-bold text-sky-600 text-xl">{name}</h2>
          </div>
        </div>
        <div className="flex gap-1">
          <h3 className="pl-5 font-bold text-emerald-300">Telefone:</h3>
          <p className="pl-1 text-stone-300">{phone}</p>
        </div>
        <div className="flex gap-1">
          <h3 className="pl-5 font-bold text-emerald-300">Email:</h3>
          <p className="pl-1 text-stone-300">{email}</p>
        </div>
      </div>
      <div className="pr-5 pt-3">
        <button onClick={handleDelete} className="border-emeral-300 border py-1 px-1.5 rounded-xs text-emerald-300 hover:bg-gray-700" >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </section>
  );
}