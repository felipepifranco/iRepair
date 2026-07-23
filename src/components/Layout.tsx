import { Link, useNavigate } from 'react-router';

// Opção 1: Link (para navegação em texto/botões simples)
export const Menu = () => {
  return (
    <nav className="flex gap-4 p-4 bg-zinc-800 text-white">
      <Link to="/">Dashboard</Link>
      <Link to="/clients">Clientes</Link>
      <Link to="/service-orders">Ordens de Serviço</Link>
    </nav>
  );
};

// Opção 2: useNavigate (para navegar programaticamente)
// Arrow function para o componente, function normal para o handler
export const BackButton = () => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1); // volta uma página no histórico
  }

  return <button onClick={handleBack}>Voltar</button>;
};
