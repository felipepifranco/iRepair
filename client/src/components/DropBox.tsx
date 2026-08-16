import { useState, useEffect } from "react";
import { type Client } from "../../types";
import { getAllClients } from "../services/clientService";

export function ClientSelectDropdown({ name,setName, onSelectClient}: {name: string; setName: (name: string) => void; onSelectClient: (clientId: number | null) => void;}) {
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getAllClients();
        setClientsList(data);
      } catch (error) {
        console.error("Erro ao carregar clientes para o dropdown:", error);
      }
    }
    loadClients();
  }, []);

  const filteredClients = clientsList.filter((c) =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={name}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onChange={(e) => {
          setName(e.target.value);
          onSelectClient(null); 
          setIsOpen(true);
        }}
        placeholder="nome do cliente"
        className="p-1 rounded bg-zinc-700 text-white w-full"
      />

      {/* Dropdown */}
      {isOpen && filteredClients.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-zinc-700 border border-zinc-600 rounded-b shadow-lg max-h-40 overflow-y-auto z-10 mt-1">
          {filteredClients.map((client) => (
            <li
              key={client.id}
              onClick={() => {
                setName(client.name);
                onSelectClient(client.id);
                setIsOpen(false);
              }}
              className="p-2 hover:bg-zinc-600 text-white cursor-pointer text-sm"
            >
              {client.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}