import './App.css'
import NewServiceForm from './components/NewServiceForm'
import Header from './components/Header'

function App() {

  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <NewServiceForm />
    </div>
  )
}

export default App
