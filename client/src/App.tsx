import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';

import { ServiceOrdersPage } from "./pages/ServiceOrdersPage"
import { DashboardPage } from './pages/DashboardPage';
import  { ClientsPage } from './pages/ClientsPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Header } from './components/Header';
import LoginHeader from './components/LoginHeader';

import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './routes/PrivateRoute'

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

const LoginLayout = () => {
  return (
    <div>
      <header className=" bg-gray-800 text-white">
        <LoginHeader />
      </header>
      <main className="p-6">
        <Outlet /> {/* A página filha aparece aqui */}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota pública */}
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rotas protegidas — envolvem o layout já existente */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/service-orders" element={<ServiceOrdersPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App
