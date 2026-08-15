import { Link } from 'react-router';

export function LoginHeader(){
  
  return (
    <header className="bg-cyan-900 border-b border-cyan-800 w-full py-4 px-8 flex justify-between items-center ">
      <h1 className=' text-emerald-50 font-bold text-2xl'>iRepair</h1>
      <nav className="flex items-center gap-2">
        <Link to="/login" className='bg-cyan-900/50 hover:bg-cyan-800/60 p-1.5 rounded-lg border border-cyan-600'>Login</Link>
        <Link to="/register" className='bg-cyan-900/50 hover:bg-cyan-800/60 p-1.5 rounded-lg border border-cyan-600'>Register</Link>
      </nav>
    </header>
  )
}

export default LoginHeader