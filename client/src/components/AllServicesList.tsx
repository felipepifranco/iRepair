import { ServiceCard } from "./ServiceCard"; 
import { type ServiceOrder } from '../../types';

export function AllServicesList({isLoading, error, services, fetchServices} : {isLoading : boolean, error : string | null, services : ServiceOrder[], fetchServices: () => void}){
  if (isLoading){
    return(
      <div className="flex justify-center mt-10">
        <p className="text-white font-bold" >Carregando...</p>
      </div>
    )
  }
  
  if (error){
    return(
      <div className="flex justify-center mt-10">
        <p className="text-red-500 font-bold" >{error}</p>
      </div>
    )
  }
  
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
          fetchServices={fetchServices}
        />
      ))}
    </div>
  )
}