import { useState } from "react";
import { type ServiceOrder } from "../types/serviceOrder";
  

export function ServiceCard({client_id,device, issue, created_at, due_at, status} : ServiceOrder){
  
  const [status_, setStatus] = useState(status); 
  
  function alternaStatus(){
    setStatus((prev) => (prev === "open" ? "done" : "open"));
  };

  // TODO: fazer função de pegar nome do cliente

  return (
    <section className="self-center w-3xl flex flex-col border-solid border border-stone-500 rounded-sm py-4 gap-1 ">
      <div className="flex justify-between px-5 items-center">
        <div className="flex gap-4 items-center">
          # TODO: pegar o nome do cliente em vez do id
          <h2 className="font-bold text-sky-600 text-xl">{client_id}</h2>
          <span className="text-emerald-300"> - </span>
          <h2 className=" text-sky-600 text-xl ">{device}</h2>
        </div>
        {status_ === "open" ? (
          <button className=" border border-green-950 bg-green-300 hover:bg-green-500 px-4 py-1 rounded-sm"
          onClick={alternaStatus}>
            Em aberto
          </button>
        ) : (
          <button className=" border border-green-950 bg-red-500 hover:bg-red-300 px-4 py-1 rounded-sm"
          onClick={alternaStatus}>
            Fechado
          </button>
        )}
      </div>
      <h3 className="px-5 font-bold text-emerald-300">Defeito:</h3>
      <p className="px-6 text-stone-300">{issue}</p>
      <div className="border-b border-stone-500 w-4/5 py-1 mx-auto"></div>
      <footer className="px-6 py-2 flex justify-between">
        {created_at && (
          <p className=" text-stone-300"> 
            <span className="px-5  text-emerald-300">Data chegada:</span> {created_at}</p>
        )}
        {due_at && (
          <p className=" text-stone-300"> 
            <span className="px-5  text-emerald-300">Data entrega:</span> {due_at}</p>
        )}
      </footer>
    </section>
  );
}