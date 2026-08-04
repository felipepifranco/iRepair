import { type Client } from "../types";
import { ClientCard } from "./ClientCard";


export function AllClientsList({clients,loadClients, hasLoaded }: {clients: Client[]; loadClients: () => void; hasLoaded: boolean }){
  if(!hasLoaded){
    return(
      <div className="flex justify-center mt-10">
        <p className="text-white font-bold" >Carregando...</p>
      </div>
    )
  }

  return(
    <div className="flex flex-col gap-4 mt-4">
      {clients.length === 0 && 
      <p className="text-center text-stone-400">Nenhum serviço registrado.</p>}
      
      {clients.map((client : Client) => (
        <ClientCard 
          key={client.id} 
          id={client.id}
          name={client.name}
          phone={client.phone}
          email={client.email}
          created_at={client.created_at}
          loadClients={loadClients}
        />
      ))}
    </div>
  )
}