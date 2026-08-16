// src/pages/Register.tsx
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Register() {
  const [email, setEmail]           = useState('')
  const [senha, setSenha]           = useState('')
  const [erro, setErro]             = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const { register } = useAuth()
  const navigate  = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro(null)
    setCarregando(true)

    try {
      await register(email, senha)
      navigate('/login') // redireciona para a página de login após o registro
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao fazer registro.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div>
      <h1 className="font-bold text-sky-600 text-xl px-1 pb-5" >Registro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col py-4 gap-4 px-6 w-1/2">
        <input type="email"    value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required 
          className="p-1 rounded bg-zinc-700 text-white"/>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" required 
          className="p-1 rounded bg-zinc-700 text-white"/>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit" disabled={carregando} className="bg-sky-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-sky-700 w-1/5 ">
          {carregando ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  )
}
