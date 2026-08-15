import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { type ServiceOrder, type ServiceOrderStatus } from "../../../shared/types";
import { deleteServiceOrder, changeStatus } from "../services/serviceOrderService";
import { getClientName } from "../services/clientService";
import { formatTime } from "../utils/formatTime";


export function ServiceCard({id, client_id,device, issue, created_at, status, fetchServices} : ServiceOrder & { fetchServices: () => void } ){
  const [status_, setStatus] = useState(status); 
  
  // TODO: FAZER ISSO MUDAR O ESTADO REAL
  async function alternaStatus() {
    let newStatus : ServiceOrderStatus;
    if (status_ === "open") newStatus = "in_progress";
    else if (status_ === "in_progress") newStatus = "done";
    else newStatus =  "open";

    setStatus(newStatus);

    try {
      await changeStatus(id, newStatus);
    } catch (error) {
      console.error("Erro ao alterar o status na API:", error);
    }
  }

  const [clientName, setClientName] = useState("");

  useEffect(() => {
    async function loadName() {
      try {
        const name = await getClientName(client_id);
        setClientName(name);
      } catch (error) {
        console.error("Erro ao buscar nome do cliente:", error);
        setClientName(`Cliente #${client_id}`); 
      }
    }

    if (client_id) {
      loadName();
    }
  }, [client_id]);

  async function handleDelete(){
    try{
      await deleteServiceOrder(id)
      console.log(`Cliente ${id} deletado com sucesso!`);
      fetchServices()
    } catch(error){
      console.error("Erro ao deletar cliente:", error);
    }
  }

  const statusConfig = {
    open: {
      label: "Aberto",
      className: "border border-amber-950 bg-amber-400 hover:bg-amber-500 text-black",
    },
    in_progress: {
      label: "Em andamento",
      className: "border border-blue-950 bg-blue-500 hover:bg-blue-600 text-white",
    },
    done: {
      label: "Concluído",
      className: "border border-green-950 bg-green-500 hover:bg-green-600 text-white",
    },
  };
  

  return (
    <section className="self-center w-3xl flex flex-col border-solid border border-stone-500 rounded-sm py-4 gap-1 ">
      <div className="flex justify-between px-5 items-center">
        <div className="flex gap-4 items-center">
          <h2 className="font-bold text-sky-600 text-xl">
            {clientName}
          </h2>
          <span className="text-emerald-300"> - </span>
          <h2 className=" text-sky-600 text-xl ">{device}</h2>
        </div>
        <div className="flex items-center gap-3">
          {(() => {
            const current = statusConfig[status_] ?? statusConfig.open;
            return (
              <button
                onClick={alternaStatus}
                className={`px-4 py-1 rounded-sm font-medium transition-colors cursor-pointer ${current.className}`}>
                {current.label}
              </button>
            );
          })()}
        <button onClick={handleDelete} className="border-emeral-300 border py-1 px-1.5 rounded-xs text-emerald-300 hover:bg-gray-700" >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        </div>
      </div>
      <h3 className="px-5 font-bold text-emerald-300">Defeito:</h3>
      <p className="px-6 text-stone-300">{issue}</p>
      <div className="border-b border-stone-500 w-4/5 py-1 mx-auto"></div>
      <footer className=" py-2 flex justify-between">
        {created_at && (
          <p className=" text-stone-300"> 
            <span className="px-5 font-bold text-emerald-300">Data chegada:</span> {formatTime(created_at)}</p>
        )}
      </footer>
    </section>
  );
}