import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';


export function Header(){
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/login') // ou '/auth/login', dependendo da sua rota de login
    } catch (error) {
      console.error('Erro ao sair:', error)
    }
  }
  
  return (
    <header className="bg-cyan-900 border-b border-cyan-800 w-full py-4 px-8 flex justify-between items-center ">
      <h1 className=' text-emerald-50 font-bold text-2xl'>iRepair</h1>
      <nav className="flex items-center gap-2">
        <Link to="/" className='bg-cyan-900/50 hover:bg-cyan-800/60 p-1.5 rounded-lg border border-cyan-600'>Dashboard</Link>
        <Link to="/clients" className='bg-cyan-900/50 hover:bg-cyan-800/60 p-1.5 rounded-lg border border-cyan-600'>Clientes</Link>
        <Link to="/service-orders" className='bg-cyan-900/50 hover:bg-cyan-800/60 p-1.5 rounded-lg border border-cyan-600'>Ordens de Serviço</Link>
        <button 
          type="button"
          onClick={handleLogout} 
          className="bg-red-900/50 hover:bg-red-800/60 p-1.5 rounded-lg border border-red-600 text-white cursor-pointer"
        >
          Sair
        </button>
      </nav>
    </header>
  )
}

export default Header