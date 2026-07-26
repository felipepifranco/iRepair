export type ServiceOrderStatus = 'open' | 'in_progress' | 'done';

export interface ServiceOrder {
  id: number; // usado em map !!
  client_id: number;
  device: string;
  issue: string;
  status: ServiceOrderStatus;
  created_at : string;
}

export type CreateServiceOrderData = Omit<ServiceOrder, 'id' | 'created_at' | 'client_id'> & {
  clientId: number;
};