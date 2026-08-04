import { useState, useEffect } from "react";

import { NewClientForm } from "../components/NewClientForm"
import { AllClientsList } from "../components/AllClientsList"
import { type Client } from "../types";
import { getAllClients } from "../services/clientService";

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false)
  
  async function loadClients() {
    const data = await getAllClients();
    setClients(data);
    setHasLoaded(true)
  }

  useEffect(() => {
    loadClients();
  }, []);
  
  return(
    <div>
      <NewClientForm loadClients={loadClients}/>
      <AllClientsList clients={clients} loadClients={loadClients} hasLoaded={hasLoaded}/>
    </div>
  )
}
