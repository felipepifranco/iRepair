import { useState } from 'react'
import './App.css'
import { ServiceCard } from './components/ServiceCard'
import NewServiceForm from './components/NewServiceForm'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <NewServiceForm />
    </div>
  )
}

export default App
