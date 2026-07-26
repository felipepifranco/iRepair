import { useState, useEffect } from 'react';

import NewServiceForm from './../components/NewServiceForm'
import Header from './../components/Header'
import { type ServiceOrder } from '../types';
import { getAllServiceOrders } from "../services/serviceOrderService";
import { AllServicesList } from '../components/AllServicesList';

export const ServiceOrdersPage = () => {
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

  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <NewServiceForm fetchServices={fetchServices} />
      <AllServicesList isLoading={isLoading} error={error} services={services} fetchServices={fetchServices}/>
    </div>
  )
}

