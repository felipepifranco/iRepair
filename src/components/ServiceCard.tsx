import { useState } from "react";

export interface ServiceCardProp {
  nomeCliente : string;
  aparelho : string;
  defeito: string;
  dataChegou? : Date;
  dataEntrega? : Date;
  id?: number; // usado em map !!
}

export function ServiceCard({nomeCliente, aparelho, defeito, dataChegou, dataEntrega,} : ServiceCardProp){
  
  const [status, setStatus] = useState("aberto"); 
  
  function alternaStatus(){
    setStatus((prev) => (prev === "aberto" ? "fechado" : "aberto"));
  };

  return (
    <section className="self-center w-3xl flex flex-col border-solid border border-stone-500 rounded-sm py-4 gap-1 ">
      <div className="flex justify-between px-5 items-center">
        <div className="flex gap-4 items-center">
          <h2 className="font-bold text-sky-600 text-xl">{nomeCliente}</h2>
          <span className="text-emerald-300"> - </span>
          <h2 className=" text-sky-600 text-xl ">{aparelho}</h2>
        </div>
        {status === "aberto" ? (
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
      <p className="px-6 text-stone-300">{defeito}</p>
      <div className="border-b border-stone-500 w-4/5 py-1 mx-auto"></div>
      <footer className="px-6 py-2 flex justify-between">
        {dataChegou && (
          <p className=" text-stone-300"> 
            <span className="px-5  text-emerald-300">Data chegada:</span> {dataChegou.toLocaleDateString()}</p>
        )}
        {dataEntrega && (
          <p className=" text-stone-300"> 
            <span className="px-5  text-emerald-300">Data entrega:</span> {dataEntrega.toLocaleDateString()}</p>
        )}
      </footer>
    </section>
  );
}