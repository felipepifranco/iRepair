import {useState} from "react"
import { type CreateClientData } from "../../../shared/types";
import { createClient } from "../services/clientService";

export function NewClientForm({ loadClients }: { loadClients: () => void }) {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    if (name.trim() !== "" && phone.trim() !== "" && email.trim() !== "") {
      //TODO: tratar informações vazias?
      const newService: CreateClientData = {
        name: name,
        phone: phone,
        email: email
      };
      
      try {        
        await createClient(newService);
handleSubmit
        loadClients()

        setName("");
        setPhone("");
        setEmail("");

      } catch (e) {
        // TODO: TRATAR ERRO DE EMAIL INVALIDO PARA AVISAR NA TELA
        console.error(e);
      }
    }
  }


  
  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="self-center w-3xl flex flex-col border-solid border border-stone-200 rounded-sm py-4 gap-4 bg-zinc-800 px-6">
        <p className="font-bold text-sky-600 text-xl px-1">Novo Cliente</p>
        <div className="flex flex-col gap-1">
          <label className="text-sky-600">Nome:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="nome do cliente" 
            className="p-1 rounded bg-zinc-700 text-white w-full"
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2 items-center">
            <label className="text-sky-600">Telefone:</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="telefone do cliente" 
              className="p-1 rounded bg-zinc-700 text-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sky-600">Email:</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="email do cliente" 
              className="p-1 rounded bg-zinc-700 text-white"
            />
          </div>
        </div>
        <input 
          type="submit" 
          value="Salvar" 
          className="bg-sky-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-sky-700"
        />
      </form>

    </div>
  )
}

