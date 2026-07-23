import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import { ServiceOrdersPage } from "./pages/ServiceOrdersPage"
import { DashboardPage } from './pages/DashboardPage';
import  { ClientsPage } from './pages/ClientsPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/service-orders" element={<ServiceOrdersPage />} />
         <Route path="*" element={<h1>Página não encontrada 💔</h1>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
