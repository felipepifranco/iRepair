import { useState } from 'react'
import './App.css'
import { ServiceCard } from './components/ServiceCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold underline'>
        Hello World!
      </h1>
      <ServiceCard nomeCliente='Felipe' aparelho='Motonete' defeito='nadinha'/>
    </>
  )
}

export default App
