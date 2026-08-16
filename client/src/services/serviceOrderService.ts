import { api } from './api'
import { type ServiceOrder, type CreateServiceOrder, type ServiceOrderStatus } from '../../types';

export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  const response = await api.get<ServiceOrder[]>('/service-orders');
  return response.data;
}

export async function createServiceOrder(
  data: CreateServiceOrder
): Promise<ServiceOrder> {
  const response = await api.post<ServiceOrder>('/service-orders', data);
  return response.data;
}

export async function deleteServiceOrder(id: number) {
  await api.delete(`/service-orders/${id}`);
}

export async function searchService(id:number) : Promise<ServiceOrder>{
  const response = await api.get<ServiceOrder>(`/service-orders/${id}`);
  return response.data;
}

export async function changeStatus(id_: number, status_ : ServiceOrderStatus){
  const originalData = await searchService(id_);
  
  const { id, created_at, client_id, ...restData } = originalData;

  const data = {
    ...restData,
    clientId: client_id,
    status: status_,
  };

  await api.put(`/service-orders/${id_}`, data);
}