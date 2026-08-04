import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import { ServiceOrdersPage } from "./pages/ServiceOrdersPage"
import { DashboardPage } from './pages/DashboardPage';
import  { ClientsPage } from './pages/ClientsPage';
import { Header } from './components/Header';

import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div>
      <header className=" bg-gray-800 text-white">
        <Header />
      </header>
      <main className="p-6">
        <Outlet /> {/* A página filha aparece aqui */}
      </main>
    </div>
  );
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/service-orders" element={<ServiceOrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
