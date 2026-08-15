import { useState, useEffect } from "react";

import { AllServicesList } from "../components/AllServicesList"
import { type ServiceOrder } from "../../../shared/types";
import { getAllServiceOrders } from "../services/serviceOrderService";

export function DashboardPage() {
  const [services, setServices] = useState<ServiceOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  async function fetchServices() {
    try {
      const data = await getAllServiceOrders();
      setServices(data);
    } catch (e) {
      setError('Não foi possível carregar os serviços.');
    } finally{
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchServices()
  }, []);
  
  
  return(
    <div>
      <AllServicesList isLoading={isLoading} error={error} services={services} fetchServices={fetchServices}/>
    </div>
  )
}



  

