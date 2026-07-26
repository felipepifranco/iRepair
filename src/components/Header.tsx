import { Link } from 'react-router';

export function Header(){
  
  return (
    <header className="bg-cyan-900 border-b border-cyan-800 w-full py-4 px-8 flex justify-between items-center ">
      <h1 className=' text-emerald-50 font-bold text-2xl'>iRepair</h1>
      <nav className="flex items-center gap-2">
        <Link to="/" className='bg-cyan-900/50 p-1.5 rounded-lg border border-cyan-600'>Dashboard</Link>
        <Link to="/clients" className='bg-cyan-900/50 p-1.5 rounded-lg border border-cyan-600'>Clientes</Link>
        <Link to="/service-orders" className='bg-cyan-900/50 p-1.5 rounded-lg border border-cyan-600'>Ordens de Serviço</Link>
      </nav>
    </header>
  )
}

export default Header