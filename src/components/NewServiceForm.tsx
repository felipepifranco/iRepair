import { useState } from "react";
import { ServiceCard, type ServiceCardProp } from "./ServiceCard"; 

const NewServiceForm = () => {
  const [servicos, setServicos] = useState<ServiceCardProp[]>([]);

  //inputs
  const [nome, setNome] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [defeito, setDefeito] = useState("");
  const [dataChegouStr, setDataChegouStr] = useState("");
  const [dataEntregaStr, setDataEntregaStr] = useState("");

  //envio formulario
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nome.trim() !== "" && aparelho.trim() !== "" && defeito.trim() !== "") {
      const novoServico: ServiceCardProp = {
        id: Date.now(),
        nomeCliente: nome,
        aparelho: aparelho,
        defeito: defeito,
        dataChegou: dataChegouStr ? new Date(dataChegouStr) : new Date(),
        dataEntrega: dataEntregaStr ? new Date(dataEntregaStr) : undefined,
      };

      setServicos((prevServicos) => [...prevServicos, novoServico]);

      setNome("");
      setAparelho("");
      setDefeito("");
      setDataChegouStr("");
      setDataEntregaStr("");
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
          <div className="flex gap-2 items-center">
            <label className="text-sky-600 text-sm">Data entrega:</label>
            <input 
              type="date" 
              value={dataEntregaStr} 
              onChange={(e) => setDataEntregaStr(e.target.value)} 
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
      <div className="flex flex-col gap-4 mt-4">
        {servicos.length === 0 && 
        <p className="text-center text-stone-400">Nenhum serviço registrado.</p>}
        
        {servicos.map((servico) => (
          <ServiceCard 
            key={servico.id} 
            nomeCliente={servico.nomeCliente}
            aparelho={servico.aparelho}
            defeito={servico.defeito}
            dataChegou={servico.dataChegou}
            dataEntrega={servico.dataEntrega}
          />
        ))}
      </div>
    </div>
  );
};

export default NewServiceForm;